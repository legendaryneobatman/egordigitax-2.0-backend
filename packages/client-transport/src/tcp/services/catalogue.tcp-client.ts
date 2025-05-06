import { Transport } from '@nestjs/microservices';
import { CatalogueConfig, SharedConfig } from '@repo/config';
import { TcpTypedClientProxy } from '../tcp.typed-client.provider';
import { CatalogueServicePatterns } from '@repo/schemas';
import { Provider } from '@nestjs/common';
import { TcpClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';

const CATALOGUE_SERVICE_CONFIG: TcpClientOptions = {
  transport: Transport.TCP,
  options: {
    host: SharedConfig.isUseNamespaceAsHost ? CatalogueConfig.namespace : undefined,
    port: CatalogueConfig.tcpPort,
  }
};

export const CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN = Symbol('CATALOGUE_SERVICE_TOKEN');
export type CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN = TcpTypedClientProxy<CatalogueServicePatterns>;

export const CatalogueServiceClientProvider: Provider<CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN> = {
  provide: CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN,
  useFactory: () => new TcpTypedClientProxy<CatalogueServicePatterns>(CATALOGUE_SERVICE_CONFIG)
};
