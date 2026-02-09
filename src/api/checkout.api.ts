import { BASE_URL } from '../config/constants';
import { clearCart, getCart } from './cart.api';
import { request } from './http';
import { OrderModel } from '../models/OrderModel';
import { getCurrentUser } from './auth.helper';
import { debugLog } from '../../logger';

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
  const user = await getCurrentUser();
  debugLog(user);
  debugLog('placeOrder', cart);
  // 2️⃣ Fetch existing orders
  if (!cart.items.length) {
    throw new Error('Cart is empty');
  }

  const existingOrders = await request<OrderModel[]>(`${BASE_URL}/orders`);
  // 3️⃣ Generate sequential order ID
  debugLog('existingOrders', existingOrders);
  const orderId = generateNextOrderId(existingOrders);
  debugLog('orderId', orderId);
  const orderPayload = {
    id: orderId,
    userId: user.id,
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

  const numbers = orders
    .map(o => {
      if (typeof o.id !== 'string') return null;
      if (!o.id.startsWith('ord_')) return null;

      const n = Number(o.id.replace('ord_', ''));
      return Number.isFinite(n) ? n : null;
    })
    .filter((n): n is number => n !== null);

  if (!numbers.length) {
    return `ord_${base + 1}`;
  }

  const max = Math.max(...numbers);
  return `ord_${max + 1}`;
}
