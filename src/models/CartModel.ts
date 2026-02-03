export interface CartItemModel {
  id?: number; // json-server internal id
  productId: string;
  title: string;
  thumbnail: string;
  price: number;
  qty: number;
  options?: CartItemOptions;
}

export interface CartModel {
  items: CartItemModel[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface CartItemOptions {
  color?: string;
  size?: string;
}
