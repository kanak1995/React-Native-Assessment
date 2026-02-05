export type OrderStatus = 'processing' | 'delivered' | 'cancelled';

export interface OrderItemModel {
  productId: string;
  title: string;
  thumbnail?: string;
  price: number;
  qty: number;
}

export interface OrderModel {
  id: string;
  status: OrderStatus;
  amount: number;
  createdAt: string;
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
  items: OrderItemModel[];
}
