import { configurator } from '../configurator.js'

export interface CatalogueConfig {
  namespace: string;
  tcpPort: number;
  database: {
    url: string;
  }
}

export const CatalogueConfig: CatalogueConfig = {
  namespace: configurator.get('SERVICE_CATALOGUE_NAMESPACE').execute(),
  tcpPort: configurator.get('SERVICE_CATALOGUE_TCP_PORT').toNumber().execute(),
  database: {
    url: configurator.get('SERVICE_CATALOGUE_DATABASE_URL').execute(),
  }
}
