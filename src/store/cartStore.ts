import { create } from 'zustand';
import Toast from 'react-native-toast-message';
import {
  getCart,
  addToCart,
  updateCartItemQty,
  removeFromCart,
  clearCart,
} from '../api/cart.api';
import { getProductById, updateProductStock } from '../api/product.api';
import { useProductStore } from './productStore';
import { CartItemModel } from '../models/CartModel';

interface CartState {
  items: CartItemModel[];
  subtotal: number;
  tax: number;
  total: number;
  loading: boolean;

  fetchCart: () => Promise<void>;
  addItem: (product: any, qty: number) => Promise<void>;
  updateQty: (productId: string, qty: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clear: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const cart = await getCart();
      set({
        items: cart.items,
        subtotal: cart.subtotal,
        tax: cart.tax,
        total: cart.total,
      });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (item, qty) => {
    // 1. Get current stock
    const product = await getProductById(item.productId);
    if (product.stock < qty) {
      Toast.show({
        type: 'error',
        text1: 'Stock Unavailable',
        text2: `Only ${product.stock} items available in stock`,
      });
      throw new Error('Not enough stock');
    }

    // 2. Sync Stock to Server
    await updateProductStock(item.productId, product.stock - qty);

    // 3. Update Cart
    await addToCart(item, qty);

    // 4. Update Local UI Stores
    useProductStore.getState().updateLocalStock(item.productId, -qty);
    await get().fetchCart();
  },

  updateQty: async (productId, qty) => {
    const items = get().items;
    const item = items.find(i => i.productId === productId);
    if (!item) return;

    const diff = qty - item.qty; // 2 - 1 = 1 (increase), 1 - 2 = -1 (decrease)

    const product = await getProductById(productId);
    if (diff > 0 && product.stock < diff) {
      Toast.show({
        type: 'error',
        text1: 'Stock Unavailable',
        text2: `Only ${product.stock + item.qty} items available in total`,
      });
      throw new Error('Not enough stock');
    }

    // Sync Stock to Server
    await updateProductStock(productId, product.stock - diff);

    // Sync Cart to Server
    await updateCartItemQty(productId, qty);

    // Update Local UI
    useProductStore.getState().updateLocalStock(productId, -diff);
    await get().fetchCart();
  },

  removeItem: async productId => {
    const item = get().items.find(i => i.productId === productId);
    if (item) {
      const product = await getProductById(productId);
      await updateProductStock(productId, product.stock + item.qty);
      useProductStore.getState().updateLocalStock(productId, item.qty);
    }

    await removeFromCart(productId);
    await get().fetchCart();
  },

  clear: async () => {
    const items = get().items;

    // Restore stock for all items
    for (const item of items) {
      const product = await getProductById(item.productId);
      await updateProductStock(item.productId, product.stock + item.qty);
      useProductStore.getState().updateLocalStock(item.productId, item.qty);
    }

    await clearCart();
    set({
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
    });
  },
}));
