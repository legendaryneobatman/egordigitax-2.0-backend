import { ModuleMetadata } from '@nestjs/common';
import { ProductService } from './product.service';

export const SERVICES_INJECT_PROVIDERS: ModuleMetadata['providers'] = [
  ProductService,
];
