import { useState, useCallback } from 'react';
import { OrderModel } from '../models/OrderModel';
import { getOrders } from '../api/orders.api';
import {
  CommonActions,
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import Screens from '../screens/Screen';

export function useOrders() {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const fetchOrders = useCallback(async (pageNo = 1) => {
    try {
      if (pageNo === 1) setLoading(true);
      const res = await getOrders({ page: pageNo, limit: 10 });

      setOrders(prev => (pageNo === 1 ? res : [...prev, ...res]));
    } catch (e) {
      console.log('Failed to load orders', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const { logout } = useAuthStore();

  const logoutHandle = async () => {
    await logout();
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders(1);
    }, [fetchOrders]),
  );

  return {
    orders,
    loading,
    refreshing,
    logoutHandle,
    onRefresh: () => {
      setRefreshing(true);
      setPage(1);
      fetchOrders(1);
    },
    onLoadMore: () => {
      if (loading) return;
      const next = page + 1;
      setPage(next);
      fetchOrders(next);
    },
  };
}
