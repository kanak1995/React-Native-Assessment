import { styles } from '../../../styles/CartScreen.styles';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { CartItemModel } from '../../../models/CartModel';
import { useCart } from '../../../hooks/useCart';
import CartItem from '../../../components/CartItem';
import { useCallback } from 'react';

const CartScreen = () => {
  const { cart, onIncrement, onDecrement, onRemove, checkoutHandle } =
    useCart();

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

  if (!cart) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading cart...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart ({cart.items.length})</Text>

      <FlatList
        data={cart.items}
        keyExtractor={item => item.productId}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>₹{cart.subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tax</Text>
          <Text style={styles.value}>₹{cart.tax.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{cart.total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} onPress={checkoutHandle}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
