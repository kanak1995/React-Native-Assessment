import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import Screens from '../../Screen';
import { useWishlistStore } from '../../../store/wishlistStore';
import { getProducts } from '../../../api/product.api';
import { ProductModel } from '../../../models/ProductModel';
import ProductCard from '../../../components/ProductCard';
import { styles } from '../../../styles/WishlistScreen.styles';
import { colors } from '../../../theme/colors';

const WishlistScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { wishlistIds } = useWishlistStore();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlistProducts = useCallback(async () => {
    if (wishlistIds.length === 0) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const res = await getProducts({
        ids: wishlistIds,
        limit: 100, // Fetch all wishlist items
      });
      setProducts(res);
    } catch (error) {
      console.error('Failed to fetch wishlist products', error);
    } finally {
      setLoading(false);
    }
  }, [wishlistIds]);

  useFocusEffect(
    useCallback(() => {
      fetchWishlistProducts();
    }, [fetchWishlistProducts]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Wishlist</Text>
      </View>

      {loading && products.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.mainGreen} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() =>
                navigation.navigate(Screens.ProductDetailsScreen, {
                  productId: item.id,
                  headerTitle: item.title,
                })
              }
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Your wishlist is empty</Text>
          }
        />
      )}
    </View>
  );
};

export default WishlistScreen;
