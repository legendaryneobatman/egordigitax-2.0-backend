import { type Prisma } from '.prisma/client';

export class CreateProductDto implements Prisma.ProductCreateInput {
  name: string;
  description: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
}
