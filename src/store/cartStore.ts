import { create } from 'zustand';
import {
  getCart,
  addToCart,
  updateCartItemQty,
  removeFromCart,
  clearCart,
} from '../api/cart.api';
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
    await addToCart(item, qty);
    await get().fetchCart();
  },

  updateQty: async (productId, qty) => {
    await updateCartItemQty(productId, qty);
    await get().fetchCart();
  },

  removeItem: async productId => {
    await removeFromCart(productId);
    await get().fetchCart();
  },

  clear: async () => {
    await clearCart();
    set({
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
    });
  },
}));
