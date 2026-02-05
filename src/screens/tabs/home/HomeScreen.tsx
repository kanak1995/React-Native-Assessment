import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import { styles } from '../../../styles/HomeScreen.styles';
import { colors } from '../../../theme/colors';
import { useState, useCallback, useEffect } from 'react';
import { getCategories } from '../../../api/category.api';
import { getProducts } from '../../../api/product.api';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Screens from '../../Screen';
import { ProductModel } from '../../../models/ProductModel';
import { CategoryModel } from '../../../models/CategoryModel';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const searchDebounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const fetchProducts = useCallback(
    async (pageNo = 1, query = '', category?: string) => {
      try {
        if (pageNo === 1) setLoading(true);
        console.log('pageNo: ', pageNo, 'query: ', query);

        const response = await getProducts({
          page: pageNo,
          limit: 10,
          q: query,
          category,
        });

        console.log('response: ', response);
        setProducts(prev => {
          if (pageNo === 1) return response;
          const merged = [...prev, ...response];
          const unique = Array.from(
            new Map(merged.map(item => [item.id, item])).values(),
          );
          return unique;
        });
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchProducts(1, '');
  }, [fetchProducts]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (error) {
        console.log('Failed to load categories', error);
      }
    };
    loadCategories();
  }, []);

  /* -------------------- */
  /* Render Item */
  /* -------------------- */
  const renderItem = ({ item }: { item: ProductModel }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={() =>
        navigation.navigate(Screens.ProductDetailsScreen, {
          productId: item.id,
          headerTitle: item.title,
        })
      }
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search + Category */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search products"
          placeholderTextColor={colors.lettersAndIcons}
          style={styles.searchInput}
          value={search}
          onChangeText={text => {
            setSearch(text);
            setPage(1);

            if (searchDebounceRef.current) {
              clearTimeout(searchDebounceRef.current);
            }

            searchDebounceRef.current = setTimeout(() => {
              fetchProducts(1, text, selectedCategory);
            }, 400);
          }}
        />
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={styles.categoryText}>
            {selectedCategory
              ? categories.find(c => c.id === selectedCategory)?.name
              : 'All'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setPage(1);
          fetchProducts(1, search, selectedCategory);
        }}
        onEndReached={() => {
          if (loading || products.length === 0) return;
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProducts(nextPage, search, selectedCategory);
        }}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.loading}>No products found</Text>
          ) : null
        }
      />

      <Modal
        transparent
        visible={showCategoryModal}
        animationType="fade"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowCategoryModal(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => {
                setSelectedCategory(undefined);
                setShowCategoryModal(false);
                setPage(1);
                fetchProducts(1, search, undefined);
              }}
            >
              <Text>All</Text>
            </TouchableOpacity>

            {categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryItem}
                onPress={() => {
                  setSelectedCategory(cat.id);
                  setShowCategoryModal(false);
                  setPage(1);
                  fetchProducts(1, search, cat.id);
                }}
              >
                <Text>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default HomeScreen;
