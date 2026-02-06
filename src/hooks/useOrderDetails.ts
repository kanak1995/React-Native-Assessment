import { useEffect, useState } from 'react';
import { OrderModel } from '../models/OrderModel';
import { getOrderById } from '../api/orders.api';

export function useOrderDetails(orderId: string) {
  const [order, setOrder] = useState<OrderModel | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getOrderById(orderId);
        setOrder(res);
      } catch (e) {
        console.log('Failed to load order', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [orderId]);

  return { order, loading };
}
