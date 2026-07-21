import type { User } from './user.interface';

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
  created_by: User;
}

export interface Image {
  id: number;
  image: string;
}

export type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type Gender = 'kid' | 'men' | 'women' | 'unisex';
