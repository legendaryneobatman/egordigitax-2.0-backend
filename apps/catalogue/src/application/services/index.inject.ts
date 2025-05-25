import { ModuleMetadata } from '@nestjs/common';
import { ProductService } from './product.service';
import { AttributeService } from './attribute.service';

export const SERVICES_INJECT_PROVIDERS: ModuleMetadata['providers'] = [
  ProductService,
  AttributeService,
];
