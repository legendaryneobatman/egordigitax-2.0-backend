import { Injectable } from '@nestjs/common';
import { Product } from '.prisma/client';
import { IRepository } from '../IRepository';
import { PrismaOrmRepository } from './OrmRepository.prisma';
import { PrismaService } from './prisma.service';

export interface IProductRepository extends IRepository<Product> {}

// Реализация для продукта
@Injectable()
export class ProductRepository
  extends PrismaOrmRepository<Product>
  implements IProductRepository
{
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.product;
  }
}
