import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/CartScreen.styles';
import { CartItemModel } from '../models/CartModel';

type Props = {
  item: CartItemModel;
  onIncrement: (item: CartItemModel) => void;
  onDecrement: (item: CartItemModel) => void;
  onRemove: (productId: string) => void;
  disabled?: boolean;
};

const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  disabled,
}: Props) => {
  return (
    <View style={styles.itemRow}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => onDecrement(item)}
            disabled={item.qty === 1 || disabled}
          >
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{item.qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => onIncrement(item)}
            disabled={disabled}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => onRemove(item.productId)}
            disabled={disabled}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

/**
 * 🔥 CRITICAL:
 * React.memo prevents re-render
 * unless `item` props actually change
 */
export default React.memo(CartItem);
