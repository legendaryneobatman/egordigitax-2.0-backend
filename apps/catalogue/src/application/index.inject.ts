import { SERVICES_INJECT_PROVIDERS } from './services';
import { ModuleMetadata } from '@nestjs/common';
import {HELPER_SERVICES_INJECT_PROVIDES} from "./helpers";

export const APPLICATION_INJECT_PROVIDERS: ModuleMetadata['providers'] = [
  ...SERVICES_INJECT_PROVIDERS,
    ...HELPER_SERVICES_INJECT_PROVIDES,
];
