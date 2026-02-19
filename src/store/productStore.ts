import { create } from 'zustand';
import { ProductModel } from '../models/ProductModel';
import { CategoryModel } from '../models/CategoryModel';
import { getProducts } from '../api/product.api';
import { getCategories } from '../api/category.api';

interface ProductState {
  products: ProductModel[];
  categories: CategoryModel[];
  page: number;
  search: string;
  selectedCategory: string | undefined;
  loading: boolean;
  refreshing: boolean;
  hasMore: boolean;

  fetchProducts: (reset?: boolean) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSearch: (query: string) => void;
  setCategory: (category: string | undefined) => void;
  loadMore: () => Promise<void>;
  onRefresh: () => Promise<void>;
  updateLocalStock: (productId: string, delta: number) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  page: 1,
  search: '',
  selectedCategory: undefined,
  loading: false,
  refreshing: false,
  hasMore: true,

  fetchProducts: async (reset = false) => {
    const { page, search, selectedCategory, loading, products } = get();
    const currentPage = reset ? 1 : page;

    if (reset) set({ loading: true, products: [], page: 1, hasMore: true });

    try {
      const res = await getProducts({
        page: currentPage,
        limit: 10,
        q: search,
        category: selectedCategory,
      });

      set({
        products: reset ? res : [...products, ...res],
        hasMore: res.length === 10,
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      set({ loading: false, refreshing: false });
    }
  },

  fetchCategories: async () => {
    try {
      const res = await getCategories();
      set({ categories: res });
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  },

  setSearch: (query: string) => {
    set({ search: query, page: 1 });
    get().fetchProducts(true);
  },

  setCategory: (category: string | undefined) => {
    set({ selectedCategory: category, page: 1 });
    get().fetchProducts(true);
  },

  loadMore: async () => {
    const { loading, hasMore, page } = get();
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    set({ page: nextPage, loading: true });

    try {
      const res = await getProducts({
        page: nextPage,
        limit: 10,
        q: get().search,
        category: get().selectedCategory,
      });

      set({
        products: [...get().products, ...res],
        hasMore: res.length === 10,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  onRefresh: async () => {
    set({ refreshing: true });
    get().fetchProducts(true);
  },

  updateLocalStock: (productId: string, delta: number) => {
    set(state => ({
      products: state.products.map(p =>
        p.id === productId ? { ...p, stock: Math.max(0, p.stock + delta) } : p,
      ),
    }));
  },
}));
