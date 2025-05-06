import { ModuleMetadata } from '@nestjs/common';
import { CATALOGUE_SERVICE_INJECT_PROVIDER } from './catalogue.connector';

export const CONNECTORS_INJECT_PROVIDERS: ModuleMetadata['providers'] = [
  ...CATALOGUE_SERVICE_INJECT_PROVIDER,
];
