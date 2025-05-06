import { ModuleMetadata } from '@nestjs/common';
import { CONNECTORS_INJECT_MODULES } from './connectors';

export const INFRA_INJECT_MODULES: ModuleMetadata['imports'] = [
  ...CONNECTORS_INJECT_MODULES,
];
