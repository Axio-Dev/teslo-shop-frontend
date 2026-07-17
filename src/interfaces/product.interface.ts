import type { CreatedBy } from './user.interface';

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  clothe_type: string;
  images: Image[];
  imageUrls: string[];
  price: number;
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
}

export type Size = 'Xs' | 'S' | 'M' | 'L' | 'Xl' | 'Xxl';

export type Gender = 'kid' | 'men' | 'women' | 'unisex';
