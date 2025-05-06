import { configurator } from './configurator';

export interface SharedConfig {
  isUseNamespaceAsHost?: boolean;
}

export const SharedConfig: SharedConfig = {
  isUseNamespaceAsHost: configurator
    .get('SHARED_IS_USE_NAMESPACE_AS_HOST')
    .toBoolean()
    .withDefault(false)
    .execute(),
};
