import { ModuleMetadata } from '@nestjs/common';
import { ProductController } from './product.controller';
import { AttributeController } from './attribute.controller';

export const CONTROLLERS_INJECT_PROVIDERS: ModuleMetadata['controllers'] = [
  ProductController,
  AttributeController,
];
