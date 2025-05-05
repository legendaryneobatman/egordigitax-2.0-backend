import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
}
