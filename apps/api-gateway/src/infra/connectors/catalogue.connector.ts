import { ModuleMetadata } from '@nestjs/common';
import { CatalogueServiceClientProvider } from '@repo/client-transport';

export const CATALOGUE_SERVICE_INJECT_PROVIDER: ModuleMetadata['providers'] = [
  CatalogueServiceClientProvider,
];
