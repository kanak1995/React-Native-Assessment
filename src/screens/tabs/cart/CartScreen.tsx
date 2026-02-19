import { styles } from '../../../styles/CartScreen.styles';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { CartItemModel } from '../../../models/CartModel';
import Screens from '../../Screen';
import { useCartStore } from '../../../store/cartStore';
import { useProductStore } from '../../../store/productStore';
import CartItem from '../../../components/CartItem';
import { useCallback, useEffect } from 'react';
import Toast from 'react-native-toast-message';

const CartScreen = () => {
  const {
    items,
    subtotal,
    tax,
    total,
    loading,
    fetchCart,
    updateQty,
    removeItem,
  } = useCartStore();

  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const { products } = useProductStore();

  const onIncrement = (item: CartItemModel) => {
    const product = products.find(p => p.id === item.productId);
    if (product && product.stock > 0) {
      updateQty(item.productId, item.qty + 1);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Stock Unavailable',
        text2: 'No more items available in stock',
      });
    }
  };
  const onDecrement = (item: CartItemModel) => {
    if (item.qty > 1) updateQty(item.productId, item.qty - 1);
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
          onPress: () => removeItem(productId),
        },
      ],
    );
  };

  const checkoutHandle = () => {
    navigation.navigate(Screens.CheckoutScreen);
  };

  const renderItem = useCallback(
    ({ item }: { item: CartItemModel }) => (
      <CartItem
        item={item}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
      />
    ),
    [onIncrement, onDecrement, onRemove],
  );

  if (loading && items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading cart...</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Cart</Text>
        <View style={styles.emptyView}>
          <Text style={styles.notFound}>Your cart is empty</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart ({items.length})</Text>

      <FlatList
        data={items}
        keyExtractor={item => item.productId}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>₹{subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tax</Text>
          <Text style={styles.value}>₹{tax.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} onPress={checkoutHandle}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
