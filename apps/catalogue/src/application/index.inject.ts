import { SERVICES_INJECT_PROVIDERS } from './services';
import { ModuleMetadata } from '@nestjs/common';

export const APPLICATION_INJECT_PROVIDERS: ModuleMetadata['providers'] = [
  ...SERVICES_INJECT_PROVIDERS,
];
