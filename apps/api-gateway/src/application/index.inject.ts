import { ModuleMetadata } from '@nestjs/common';
import { SERVICES_INJECT_PROVIDERS } from './services';

export const APPLICATION_INJECT_PROVIDERS: ModuleMetadata['providers'] = [
  ...SERVICES_INJECT_PROVIDERS,
  // ...RESOURCE_INJECT_MAPPERS
];
