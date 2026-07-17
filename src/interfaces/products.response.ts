import type { Product } from './product.interface';

export interface ProductsResponse {
  count: number;
  products: Product[];
  pages: number;
}
