import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { OrderModel } from '../models/OrderModel';
import { styles } from '../styles/OrdersScreen.styles';

interface Props {
  order: OrderModel;
  onPress: () => void;
}

const OrderItem = ({ order, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={onPress}
      accessibilityLabel={`Order ${order.id}`}
      accessibilityRole="button"
    >
      <View style={styles.row}>
        <Text style={styles.orderId}>#{order.id}</Text>
        <View
          style={[
            styles.statusChip,
            order.status === 'delivered' && styles.delivered,
            order.status === 'processing' && styles.processing,
          ]}
        >
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>
      <Text style={styles.date}>
        {new Date(order.createdAt).toLocaleDateString()}
      </Text>

      <Text style={styles.amount}>₹{order.amount}</Text>
    </TouchableOpacity>
  );
};

export default OrderItem;
