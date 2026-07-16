import { Type } from 'lucide-react';
import type { CreatedBy } from './user.interface';

export interface Result {
  title: string;
  slug: string;
  description: string;
  images: Image[];
  price: string;
  stock: number;
  gender: Gender;
  sizes: Size[];
  tags: string[];
  created_at: Date;
  updated_at: Date;
  created_by: CreatedBy;
}

export interface Image {
  id: number;
  image: string;
  product: string;
}

export type Size = 'Xs' | 'S' | 'M' | 'L' | 'Xl' | 'Xxl';

export type Gender = 'kid' | 'men' | 'women' | 'unisex';
