import { ModuleMetadata } from '@nestjs/common';
import { ProductRepository } from './product.repository.prisma';
import { AttributeRepository } from './attribute.repository.prisma';

export const REPOSITORIES_INJECT_PROVIDES: ModuleMetadata['providers'] = [
  ProductRepository,
  AttributeRepository,
  //BundlesRepository
];
