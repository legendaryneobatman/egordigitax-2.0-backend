import { Transport } from '@nestjs/microservices';
import { CatalogueConfig } from '@repo/config';
import { TcpTypedClientProxy } from '../tcp.typed-client.provider';
import { CatalogueServicePatterns } from '@repo/schemas';
import { Provider } from '@nestjs/common';
import { TcpClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';

const CATALOGUE_SERVICE_CONFIG: TcpClientOptions = {
  transport: Transport.TCP,
  options: {
    port: CatalogueConfig.tcpPort
  }
};

export type CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN = TcpTypedClientProxy<CatalogueServicePatterns>;
export const CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN = Symbol('CATALOGUE_SERVICE_TOKEN');

export const CatalogueServiceClientProvider: Provider<CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN> = {
  provide: CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN,
  useFactory: () => new TcpTypedClientProxy<CatalogueServicePatterns>(CATALOGUE_SERVICE_CONFIG)
};
