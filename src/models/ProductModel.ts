export interface ProductModel {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  thumbnail: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  category: string;
  brand: string;
  stock: number;
  options: ProductOptions;
}

export interface ProductOptions {
  colors: string[];
  sizes: string[];
}
