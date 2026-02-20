import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { styles } from '../../../styles/ProductDetailsScreen.styles';
import { colors } from '../../../theme/colors';

import { useProductDetails } from '../../../hooks/useProductDetails';
import ImageCarousel from '../../../components/ImageCarousel';
import ProductOptions from '../../../components/ProductOptions';
import Button from '../../../components/Button';
import { useWishlistStore } from '../../../store/wishlistStore';
import Icon from '../../../components/Icon';

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

  const { toggleWishlist, isInWishlist } = useWishlistStore();

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

  const isFavorite = product ? isInWishlist(product.id) : false;

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
            <View style={styles.childContent}>
              <Text style={styles.price}>₹{product.price}</Text>

              <TouchableOpacity
                onPress={() => toggleWishlist(product.id)}
                style={styles.heartIcon}
              >
                <Icon
                  name={isFavorite ? 'fillHeart' : 'heart'}
                  size={26}
                  color={isFavorite ? 'red' : colors.mainGreen}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.stock, product.stock < 5 && styles.lowStock]}>
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

          <Text
            style={styles.readMore}
            onPress={() => setExpanded(!expanded)}
            accessibilityLabel={
              expanded ? 'Show less description' : 'Read more description'
            }
            accessibilityRole="button"
          >
            {expanded ? 'Show less' : 'Read more'}
          </Text>
        </View>
      </ScrollView>

      <Button
        title={product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        onPress={addToCartHandler}
        variant="solid"
        style={[styles.addButton, !canAddToCart && styles.disabledAddButton]}
        disabled={!canAddToCart}
        accessibilityLabel={
          product.stock === 0 ? 'Product out of stock' : 'Add to cart'
        }
      />
    </View>
  );
};

export default ProductDetailsScreen;
