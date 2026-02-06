import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles } from '../../../styles/HomeScreen.styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Screens from '../../Screen';

import { useHomeProducts } from '../../../hooks/useHomeProducts';
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
    onSearch,
    onRefresh,
    loadMore,
    setSelectedCategory,
    fetchProducts,
  } = useHomeProducts();

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
          setSelectedCategory(id);
          setShowCategoryModal(false);
          fetchProducts(1, search, id);
        }}
      />
    </View>
  );
};

export default HomeScreen;
