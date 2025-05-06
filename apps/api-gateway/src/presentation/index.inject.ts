import { ModuleMetadata } from '@nestjs/common';
import { CONTROLLERS_INJECT_PROVIDERS } from './controllers';

export const PRESENTATION_INJECT_PROVIDERS: ModuleMetadata['controllers'] = [
  ...CONTROLLERS_INJECT_PROVIDERS,
];
