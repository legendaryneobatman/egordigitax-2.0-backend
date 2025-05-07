import { ModuleMetadata } from '@nestjs/common';
import { PRISMA_INJECT_PROVIDERS } from './database';

export const INFRA_INJECT_PROVIDES: ModuleMetadata['providers'] = [
  ...PRISMA_INJECT_PROVIDERS,
  //...TYPEORM_INJECT_PROVIDERS
];
