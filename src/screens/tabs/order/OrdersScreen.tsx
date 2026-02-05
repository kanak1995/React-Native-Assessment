import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getOrders } from '../../../api/orders.api';
import { OrderModel } from '../../../models/OrderModel';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styles } from '../../../styles/OrdersScreen.styles';
import Screens from '../../Screen';

const OrdersScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async (pageNo = 1) => {
    try {
      if (pageNo === 1) setLoading(true);
      const res = await getOrders({ page: pageNo, limit: 10 });

      setOrders(prev => (pageNo === 1 ? res : [...prev, ...res]));
    } catch (err) {
      console.log('Failed to load orders', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const renderItem = ({ item }: { item: OrderModel }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={() =>
        navigation.navigate(Screens.OrderDetailsScreen, {
          orderId: item.id,
        })
      }
    >
      <View style={styles.row}>
        <Text style={styles.orderId}>#{item.id}</Text>
        <View
          style={[
            styles.statusChip,
            item.status === 'delivered' && styles.delivered,
            item.status === 'processing' && styles.processing,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.date}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.amount}>₹{item.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.orderHistory}>Order Histoty</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        onRefresh={() => {
          setRefreshing(true);
          setPage(1);
          fetchOrders(1);
        }}
        refreshing={refreshing}
        onEndReached={() => {
          if (loading) return;
          const next = page + 1;
          setPage(next);
          fetchOrders(next);
        }}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>No orders found</Text> : null
        }
      />
    </View>
  );
};

export default OrdersScreen;
