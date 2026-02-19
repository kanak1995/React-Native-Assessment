import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles } from '../../../styles/HomeScreen.styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Screens from '../../Screen';

import { useProductStore } from '../../../store/productStore';
import SearchBar from '../../../components/SearchBar';
import CategoryPicker from '../../../components/CategoryPicker';
import ProductCard from '../../../components/ProductCard';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const {
    products,
    categories,
    search,
    selectedCategory,
    loading,
    refreshing,
    fetchProducts,
    fetchCategories,
    setSearch,
    setCategory,
    loadMore,
    onRefresh,
  } = useProductStore();

  const searchDebounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(true);
    }
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchProducts, fetchCategories, products.length, categories.length]);

  const onSearch = (text: string) => {
    // We update the store's search state immediately for the input field
    // but debounce the API call
    useProductStore.setState({ search: text });

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      setSearch(text);
    }, 400);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={search}
        onChangeText={onSearch}
        categoryLabel={
          selectedCategory
            ? categories.find(c => c.id === selectedCategory)?.name ?? 'All'
            : 'All'
        }
        onCategoryPress={() => setShowCategoryModal(true)}
      />

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
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.loading}>No products found</Text>
          ) : null
        }
      />

      <CategoryPicker
        visible={showCategoryModal}
        categories={categories}
        onClose={() => setShowCategoryModal(false)}
        onSelect={id => {
          setCategory(id);
          setShowCategoryModal(false);
        }}
      />
    </View>
  );
};

export default HomeScreen;
