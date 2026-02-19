import React from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { styles } from '../../../styles/ProductDetailsScreen.styles';
import { colors } from '../../../theme/colors';

import { useProductDetails } from '../../../hooks/useProductDetails';
import ImageCarousel from '../../../components/ImageCarousel';
import ProductOptions from '../../../components/ProductOptions';
import Button from '../../../components/Button';
// import AddToCartButton from '../../../components/AddToCartButton';

type RouteParams = {
  ProductDetails: { productId: string };
};

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'ProductDetails'>>();

  const {
    product,
    loading,
    error,
    expanded,
    setExpanded,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    activeIndex,
    setActiveIndex,
    carouselRef,
    canAddToCart,
    addToCartHandler,
  } = useProductDetails(route.params.productId, navigation);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.mainGreen} />
      </View>
    );
  }

  if (!product || error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <ImageCarousel
          images={product.images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          carouselRef={carouselRef}
        />

        <View style={styles.content}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={[styles.stock, product.stock < 5 && { color: 'red' }]}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
            </Text>
          </View>

          <ProductOptions
            label="Color"
            options={product.options?.colors ?? []}
            selected={selectedColor}
            onSelect={setSelectedColor}
          />

          <ProductOptions
            label="Size"
            options={product.options?.sizes ?? []}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />

          <Text
            numberOfLines={expanded ? undefined : 3}
            style={styles.description}
          >
            {product.description}
          </Text>

          <Text style={styles.readMore} onPress={() => setExpanded(!expanded)}>
            {expanded ? 'Show less' : 'Read more'}
          </Text>
        </View>
      </ScrollView>

      <Button
        title={product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        onPress={addToCartHandler}
        variant="solid"
        style={{
          ...styles.addButton,
          opacity: canAddToCart ? 1 : 0.5,
        }}
        disabled={!canAddToCart}
      />
    </View>
  );
};

export default ProductDetailsScreen;
