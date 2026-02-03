import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { Dimensions } from 'react-native';
import { FontFamily } from '../../../theme/fonts';
import { getProductById } from '../../../api/product.api';
import { ProductModel } from '../../../models/ProductModel';
import { addToCart } from '../../../api/cart.api';

const { width } = Dimensions.get('window');
const AUTO_SCROLL_INTERVAL = 3000;

type RouteParams = {
  ProductDetails: {
    productId: string;
  };
};

const ProductDetailsScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'ProductDetails'>>();
  const { productId } = route.params;
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<FlatList<string>>(null);

  const handleAddToCart = async () => {
    console.log('sdfhjgjfgjgd');
    if (!product) return;
    if (hasColors && !selectedColor) {
      Alert.alert(
        'Select Color',
        'Please select a color before adding to cart.',
      );
      return;
    }

    if (hasSizes && !selectedSize) {
      Alert.alert('Select Size', 'Please select a size before adding to cart.');
      return;
    }

    try {
      await addToCart(
        {
          productId: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price,
          options: {
            color: selectedColor || undefined,
            size: selectedSize || undefined,
          },
        },
        1,
      );
      // Optional UX feedback
      console.log('Added to cart');
      Alert.alert(
        'Added to Cart',
        'Product has been added to your cart successfully.',
      );
    } catch (err) {
      console.error('Add to cart failed', err);
    }
  };

  useEffect(() => {
    if (!product?.images || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const nextIndex = prev === product.images.length - 1 ? 0 : prev + 1;

        carouselRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        return nextIndex;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [product?.images]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.mainGreen} size="large" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || 'Product not found'}</Text>
      </View>
    );
  }

  const hasColors =
    product.options?.colors && product.options.colors.length > 0;

  const hasSizes = product.options?.sizes && product.options.sizes.length > 0;

  const canAddToCart =
    product.stock > 0 &&
    (!hasColors || !!selectedColor) &&
    (!hasSizes || !!selectedSize);

  console.log('canAddToCart', !canAddToCart);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        {/* Image Carousel */}
        {product.images?.length > 0 && (
          <FlatList
            ref={carouselRef}
            data={product.images}
            horizontal
            pagingEnabled
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={e => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveIndex(index);
            }}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
          />
        )}
        {product.images?.length > 1 && (
          <View style={styles.dotsContainer}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === activeIndex && styles.activeDot]}
              />
            ))}
          </View>
        )}

        <View style={styles.content}>
          {/* Price & Rating */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.rating}>
              ★ {product.rating} ({product.reviewsCount})
            </Text>
          </View>

          {/* Options */}
          {product.options?.colors.length > 0 && (
            <View style={styles.optionGroup}>
              <Text style={styles.optionLabel}>Color</Text>
              <View style={styles.optionRow}>
                {product.options.colors.map((color: string) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.optionChip,
                      selectedColor === color && styles.optionChipActive,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <Text>{color}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {product.options?.sizes.length > 0 && (
            <View style={styles.optionGroup}>
              <Text style={styles.optionLabel}>Size</Text>
              <View style={styles.optionRow}>
                {product.options.sizes.map((size: string) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.optionChip,
                      selectedSize === size && styles.optionChipActive,
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Description */}
          <Text
            numberOfLines={expanded ? undefined : 3}
            style={styles.description}
          >
            {product.description}
          </Text>

          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.readMore}>
              {expanded ? 'Show less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add to Cart */}
      <TouchableOpacity
        // disabled={!canAddToCart}
        onPress={handleAddToCart}
        style={[
          styles.addButton,
          // !canAddToCart && { backgroundColor: colors.lightGreen, opacity: 0.5 },
        ]}
      >
        <Text style={styles.addButtonText}>
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkGreenDark,
  },
  scrollview: {
    paddingBottom: 120,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: colors.lightGreen,
  },

  image: {
    width: width,
    height: 320,
  },
  content: {
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    color: colors.mainGreen,
    fontFamily: FontFamily.poppins.semiBold,
  },
  rating: {
    color: colors.lightGreen,
  },
  optionGroup: {
    marginBottom: 12,
  },
  optionLabel: {
    color: colors.lightGreen,
    marginBottom: 6,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.lightGreen,
    marginRight: 8,
    marginBottom: 8,
  },
  optionChipActive: {
    backgroundColor: colors.mainGreen,
  },
  description: {
    color: colors.lightGreen,
    lineHeight: 22,
    marginTop: 12,
  },
  readMore: {
    color: colors.mainGreen,
    marginTop: 6,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: colors.mainGreen,
  },
  addButtonText: {
    textAlign: 'center',
    fontFamily: FontFamily.poppins.semiBold,
    color: colors.backgroundDarkGreenDark,
    fontSize: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.mainGreen,
    width: 10,
    height: 10,
  },
});
