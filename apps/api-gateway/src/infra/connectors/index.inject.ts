import { ModuleMetadata } from '@nestjs/common';
import { CATALOGUE_SERVICE_INJECT_PROVIDER } from './catalogue.connector';

export const CONNECTORS_INJECT_MODULES: ModuleMetadata['imports'] = [
  ...CATALOGUE_SERVICE_INJECT_PROVIDER,
];
