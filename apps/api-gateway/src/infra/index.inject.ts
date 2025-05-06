import { ModuleMetadata } from '@nestjs/common';
import { CONNECTORS_INJECT_PROVIDERS } from './connectors';

export const INFRA_INJECT_PROVIDERS: ModuleMetadata['providers'] = [
  ...CONNECTORS_INJECT_PROVIDERS,
];
