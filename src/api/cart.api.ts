import { CartItemModel, CartModel } from '../models/CartModel';
import { BASE_URL, TAX_RATE } from '../config/constants';
import { request } from './http';
import { getCurrentUser } from './auth.helper';
import { debugLog } from '../../logger';

/* ================= GET CART ================= */
export async function getCart(): Promise<CartModel> {
  const user = await getCurrentUser();
  const items = await request<CartItemModel[]>(
    `${BASE_URL}/cart?userId=${user.id}`,
  );

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);
  debugLog(items, subtotal, tax, total);
  return { items, subtotal, tax, total };
}

/* ================= ADD TO CART ================= */
export async function addToCart(
  item: Omit<CartItemModel, 'qty' | 'userId'>,
  qty = 1,
) {
  const user = await getCurrentUser();

  const existing = await request<CartItemModel[]>(
    `${BASE_URL}/cart?productId=${item.productId}&userId=${user.id}`,
  );

  if (existing.length) {
    return updateCartItemQty(item.productId, existing[0].qty + qty);
  }

  return request(`${BASE_URL}/cart`, {
    method: 'POST',
    body: JSON.stringify({
      ...item,
      qty,
      userId: user.id,
    }),
  });
}

// ---------------- UPDATE QTY ----------------
export async function updateCartItemQty(productId: string, qty: number) {
  const user = await getCurrentUser();
  if (qty <= 0) return removeFromCart(productId);

  const [item] = await request<CartItemModel[]>(
    `${BASE_URL}/cart?userId=${user.id}&productId=${productId}`,
  );

  if (!item) return;

  return request(`${BASE_URL}/cart/${item.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ qty }),
  });
}

// ---------------- REMOVE ITEM ----------------
export async function removeFromCart(productId: string) {
  const [item] = await request<CartItemModel[]>(
    `${BASE_URL}/cart?productId=${productId}`,
  );

  if (!item) return;

  await request(`${BASE_URL}/cart/${item.id}`, {
    method: 'DELETE',
  });
}

// ---------------- CLEAR CART ----------------
export async function clearCart(): Promise<void> {
  const user = await getCurrentUser();
  const items = await request<CartItemModel[]>(
    `${BASE_URL}/cart?userId=${user.id}`,
  );

  if (!items.length) return;

  await Promise.all(
    items.map(item =>
      request(`${BASE_URL}/cart/${item.id}`, {
        method: 'DELETE',
      }),
    ),
  );
}
