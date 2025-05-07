import { ModuleMetadata } from '@nestjs/common';
import { ProductRepository } from './product.repository.prisma';

export const REPOSITORIES_INJECT_PROVIDES: ModuleMetadata['providers'] = [
  ProductRepository,
  //BundlesRepository
];
