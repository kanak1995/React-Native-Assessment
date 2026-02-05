import { BASE_URL } from '../config/constants';
import { clearCart, getCart } from './cart.api';
import { request } from './http';
import { OrderModel } from '../models/OrderModel';

/* ======================= */
/* Types */
/* ======================= */

export interface CheckoutPayload {
  address: {
    name: string;
    phone: string;
    line1: string;
    city: string;
    postalCode: string;
    country?: string;
  };
  payment: {
    method: 'COD' | 'CARD';
  };
}

export interface CheckoutResponse {
  orderId: string;
  status: string;
  amount: number;
  createdAt: string;
}

/* ======================= */
/* API */
/* ======================= */

export async function placeOrder(
  payload: CheckoutPayload,
): Promise<CheckoutResponse> {
  // 1️⃣ Get cart
  const cart = await getCart();

  // 2️⃣ Fetch existing orders
  if (!cart.items.length) {
    throw new Error('Cart is empty');
  }

  const existingOrders = await request<OrderModel[]>(`${BASE_URL}/orders`);
  // 3️⃣ Generate sequential order ID
  const orderId = generateNextOrderId(existingOrders);

  const orderPayload = {
    id: orderId,
    status: 'processing',
    amount: cart.total,
    createdAt: new Date().toISOString(),
    address: payload.address,
    payment: payload.payment,
    items: cart.items,
  };

  const order = await request<OrderModel>(`${BASE_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify(orderPayload),
  });

  // Clear cart
  await clearCart();

  return {
    orderId: order.id,
    status: order.status,
    amount: order.amount,
    createdAt: order.createdAt,
  };
}

export function generateNextOrderId(orders: OrderModel[]): string {
  const base = 1000;

  if (!orders.length) {
    return `ord_${base + 1}`;
  }

  const lastOrder = orders[orders.length - 1];
  const lastNumber = Number(lastOrder.id.replace('ord_', ''));

  return `ord_${lastNumber + 1}`;
}
