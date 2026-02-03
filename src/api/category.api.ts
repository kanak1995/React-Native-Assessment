import { CategoryModel } from '../models/CategoryModel';
import { BASE_URL } from '../config/constants';
import { request } from './http';

export function getCategories(): Promise<CategoryModel[]> {
  return request(`${BASE_URL}/categories`);
}
