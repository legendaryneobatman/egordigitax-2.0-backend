import { Injectable } from '@nestjs/common';
import { Attribute, Prisma } from '.prisma/client';
import { IRepository } from '../../../shared/helpers/IRepository';
import { PrismaOrmRepository } from './OrmRepository.prisma';
import { PrismaService } from './prisma.service';

export interface IAttributeRepository extends IRepository<Attribute> {}

// Реализация для продукта
@Injectable()
export class AttributeRepository
  extends PrismaOrmRepository<Attribute>
  implements IAttributeRepository
{
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.attribute;
  }
}

