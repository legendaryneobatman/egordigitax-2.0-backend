export type MicroserviceNames =
  | 'analytics'
  | 'api-gateway'
  | 'cart'
  | 'catalogue'
  | 'delivery'
  | 'notification'
  | 'order'
  | 'payment'
  | 'user'
  | 'whishlist';

export interface MicroserviceMeta {
  cmd: string;
  service: MicroserviceNames;
  version?: string;
  role?: string;
  authToken?: string;
  correlationId?: string;

  [key: string]: any;
}
