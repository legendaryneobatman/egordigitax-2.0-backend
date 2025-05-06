import { configurator } from '../configurator.js'

export interface ApiGatewayConfig {
  namespace: string;
  httpPort: number;
  jwt: {
    secret: string;
    expiresIn: number;
  }
}

export const ApiGatewayConfig: ApiGatewayConfig = {
  namespace: configurator.get('SERVICE_API_GATEWAY_NAMESPACE').execute(),
  httpPort: configurator.get('SERVICE_API_GATEWAY_HTTP_PORT').toNumber().execute(),
  jwt: {
    secret: configurator.get('SERVICE_API_GATEWAY_JWT_SECRET').execute(),
    expiresIn: configurator.get('SERVICE_API_GATEWAY_JWT_EXPIRES_IN').toNumber().execute(),
  }
}
