import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistState {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistIds: [],
      toggleWishlist: (productId: string) => {
        const { wishlistIds } = get();
        const isExist = wishlistIds.includes(productId);
        if (isExist) {
          set({ wishlistIds: wishlistIds.filter(id => id !== productId) });
        } else {
          set({ wishlistIds: [...wishlistIds, productId] });
        }
      },
      isInWishlist: (productId: string) => {
        return get().wishlistIds.includes(productId);
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
