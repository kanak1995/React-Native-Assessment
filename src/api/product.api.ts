import { ProductModel } from '../models/ProductModel';
import { BASE_URL } from '../config/constants';
import { request } from './http';

interface GetProductsParams {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  sort?: 'price';
  order?: 'asc' | 'desc';
  ids?: string[];
}

export async function getProducts({
  page = 1,
  limit = 10,
  q,
  category,
  sort,
  order = 'asc',
  ids,
}: GetProductsParams): Promise<ProductModel[]> {
  const start = (page - 1) * limit;

  const params = new URLSearchParams({
    _start: String(start),
    _limit: String(limit),
    _sort: sort ?? 'id',
    _order: order,
  });

  if (q) params.append('title_like', q);
  if (category) params.append('category', category);
  if (ids && ids.length > 0) {
    ids.forEach(id => params.append('id', id));
  }

  return request<ProductModel[]>(`${BASE_URL}/products?${params.toString()}`);
}

export function getProductById(productId: string): Promise<ProductModel> {
  return request(`${BASE_URL}/products/${productId}`);
}

export function updateProductStock(
  productId: string,
  newStock: number,
): Promise<ProductModel> {
  return request(`${BASE_URL}/products/${productId}`, {
    method: 'PATCH',
    body: JSON.stringify({ stock: newStock }),
  });
}
