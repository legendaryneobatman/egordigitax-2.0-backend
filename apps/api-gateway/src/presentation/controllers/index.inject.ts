import { ModuleMetadata } from '@nestjs/common';
import { CatalogueController } from './catalogue.controller';
import { ProductController } from './product.controller';

export const CONTROLLERS_INJECT_PROVIDERS: ModuleMetadata['controllers'] = [
  CatalogueController,
  ProductController,
];
