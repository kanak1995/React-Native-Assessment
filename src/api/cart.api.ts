import { CartItemModel, CartModel } from '../models/CartModel';
import { BASE_URL, TAX_RATE } from '../config/constants';
import { request } from './http';

// ---------------- GET CART ----------------
export async function getCart(): Promise<CartModel> {
  const items = await request<CartItemModel[]>(`${BASE_URL}/cart`);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return { items, subtotal, tax, total };
}

// ---------------- ADD TO CART ----------------
export async function addToCart(item: Omit<CartItemModel, 'qty'>, qty = 1) {
  const existing = await request<CartItemModel[]>(
    `${BASE_URL}/cart?productId=${item.productId}`,
  );

  if (existing.length) {
    return updateCartItemQty(item.productId, existing[0].qty + qty);
  }

  return request(`${BASE_URL}/cart`, {
    method: 'POST',
    body: JSON.stringify({ ...item, qty }),
  });
}

// ---------------- UPDATE QTY ----------------
export async function updateCartItemQty(productId: string, qty: number) {
  if (qty <= 0) return removeFromCart(productId);

  const [item] = await request<CartItemModel[]>(
    `${BASE_URL}/cart?productId=${productId}`,
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
  const items = await request<CartItemModel[]>(`${BASE_URL}/cart`);

  if (!items.length) return;

  await Promise.all(
    items.map(item =>
      request(`${BASE_URL}/cart/${item.id}`, {
        method: 'DELETE',
      }),
    ),
  );
}
