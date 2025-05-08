import { ModuleMetadata } from '@nestjs/common';
import { CatalogueController } from './catalogue/catalogue.controller';

export const CONTROLLERS_INJECT_PROVIDERS: ModuleMetadata['controllers'] = [
  CatalogueController,
];
