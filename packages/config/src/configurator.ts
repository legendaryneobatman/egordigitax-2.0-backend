import {EnvConfigurator} from "@repo/configurator";

export interface EnvConfiguration {
  SERVICE_API_GATEWAY_NAMESPACE: string;
  SERVICE_API_GATEWAY_HTTP_PORT: number;
  SERVICE_API_GATEWAY_JWT_SECRET: string;
  SERVICE_API_GATEWAY_JWT_EXPIRES_IN: number;

  SERVICE_CATALOGUE_NAMESPACE: string;
  SERVICE_CATALOGUE_TCP_PORT: number;
  SERVICE_CATALOGUE_DATABASE_URL: string;
}

export const configurator = new EnvConfigurator<EnvConfiguration>()
