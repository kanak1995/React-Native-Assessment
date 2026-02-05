import { BASE_URL } from '../config/constants';
import { request } from './http';
import { OrderModel } from '../models/OrderModel';

interface GetOrdersParams {
  page?: number;
  limit?: number;
}

export async function getOrders({
  page = 1,
  limit = 10,
}: GetOrdersParams): Promise<OrderModel[]> {
  const start = (page - 1) * limit;

  const params = new URLSearchParams({
    _start: String(start),
    _limit: String(limit),
    _sort: 'createdAt',
    _order: 'desc',
  });

  return request<OrderModel[]>(`${BASE_URL}/orders?${params.toString()}`);
}

export function getOrderById(orderId: string): Promise<OrderModel> {
  return request<OrderModel>(`${BASE_URL}/orders/${orderId}`);
}
