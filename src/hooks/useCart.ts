import { useCallback, useState } from 'react';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { getCart, updateCartItemQty, removeFromCart } from '../api/cart.api';

import { CartItemModel, CartModel } from '../models/CartModel';
import { Alert } from 'react-native';
import Screens from '../screens/Screen';

export const useCart = () => {
  const [cart, setCart] = useState<CartModel | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  // const navigation = useNavigation<NavigationProp<any>>();
  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await getCart();
      setCart(res);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, []),
  );

  const onIncrement = async (item: CartItemModel) => {
    await updateCartItemQty(item.productId, item.qty + 1);
    loadCart();
  };

  const onDecrement = async (item: CartItemModel) => {
    if (item.qty === 1) return;

    await updateCartItemQty(item.productId, item.qty - 1);
    loadCart();
  };

  const onRemove = (productId: string) => {
    Alert.alert(
      'Remove item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeFromCart(productId);
            loadCart();
          },
        },
      ],
    );
  };

  const checkoutHandle = () => {
    navigation.navigate(Screens.CheckoutScreen);
  };

  return {
    cart,
    loading,
    onIncrement,
    onDecrement,
    onRemove,
    checkoutHandle,
  };
};
