import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { getProductById } from '../api/product.api';
import { useCartStore } from '../store/cartStore';
import { ProductModel } from '../models/ProductModel';

const AUTO_SCROLL_INTERVAL = 3000;

export const useProductDetails = (productId: string, navigation: any) => {
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<FlatList<string>>(null);

  const hasColors = !!product?.options?.colors?.length;
  const hasSizes = !!product?.options?.sizes?.length;

  const canAddToCart =
    !!product &&
    product.stock > 0 &&
    (!hasColors || !!selectedColor) &&
    (!hasSizes || !!selectedSize);

  /* Load product */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
      } catch {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  /* Auto scroll */
  useEffect(() => {
    if (!product?.images || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const next = prev === product.images.length - 1 ? 0 : prev + 1;

        carouselRef.current?.scrollToIndex({
          index: next,
          animated: true,
        });

        return next;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [product?.images]);

  const addToCartHandler = async () => {
    if (!product) return;

    if (hasColors && !selectedColor) {
      Alert.alert('Select Color', 'Please select a color');
      return;
    }

    if (hasSizes && !selectedSize) {
      Alert.alert('Select Size', 'Please select a size');
      return;
    }

    const addItem = useCartStore.getState().addItem;

    await addItem(
      {
        productId: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        options: {
          color: selectedColor ?? undefined,
          size: selectedSize ?? undefined,
        },
      },
      1,
    );

    Alert.alert('Added to Cart', 'Product added successfully', [
      { text: 'OK', onPress: navigation.goBack },
    ]);
  };

  return {
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
  };
};
