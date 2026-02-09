import { BASE_URL } from '../config/constants';
import { request } from './http';
import { OrderModel } from '../models/OrderModel';
import { getCurrentUser } from './auth.helper';

interface GetOrdersParams {
  page?: number;
  limit?: number;
}

export async function getOrders({
  page = 1,
  limit = 10,
}: GetOrdersParams): Promise<OrderModel[]> {
  const user = await getCurrentUser();
  const start = (page - 1) * limit;

  const params = new URLSearchParams({
    userId: user.id,
    _start: String(start),
    _limit: String(limit),
    _sort: 'createdAt',
    _order: 'desc',
  });

  return request<OrderModel[]>(`${BASE_URL}/orders?${params.toString()}`);
}

export async function getOrderById(orderId: string): Promise<OrderModel> {
  const user = await getCurrentUser();
  return request<OrderModel>(`${BASE_URL}/orders/${orderId}?userId=${user.id}`);
}
