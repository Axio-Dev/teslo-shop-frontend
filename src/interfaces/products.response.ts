import type { Result } from './product.interface';

export interface ProductsResponse {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}
