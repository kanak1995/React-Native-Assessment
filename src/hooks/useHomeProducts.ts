import { useCallback, useEffect, useRef, useState } from 'react';
import { ProductModel } from '../models/ProductModel';
import { CategoryModel } from '../models/CategoryModel';
import { getProducts } from '../api/product.api';
import { getCategories } from '../api/category.api';
import { debugLog } from '../../logger';

export const useHomeProducts = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchProducts = useCallback(
    async (pageNo = 1, query = '', category?: string) => {
      try {
        if (pageNo === 1) setLoading(true);

        const res = await getProducts({
          page: pageNo,
          limit: 10,
          q: query,
          category,
        });
        debugLog(res);
        setProducts(prev =>
          pageNo === 1
            ? res
            : Array.from(
                new Map([...prev, ...res].map(i => [i.id, i])).values(),
              ),
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  const onSearch = (text: string) => {
    setSearch(text);
    setPage(1);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      fetchProducts(1, text, selectedCategory);
    }, 400);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchProducts(1, search, selectedCategory);
  };

  const loadMore = () => {
    if (loading || products.length === 0) return;
    const next = page + 1;
    setPage(next);
    fetchProducts(next, search, selectedCategory);
  };

  useEffect(() => {
    fetchProducts(1, '');
  }, [fetchProducts]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return {
    products,
    categories,
    loading,
    refreshing,
    search,
    selectedCategory,

    setSelectedCategory,
    onSearch,
    onRefresh,
    loadMore,
    fetchProducts,
  };
};
