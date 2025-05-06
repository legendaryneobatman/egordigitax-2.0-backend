import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATALOGUE_SERVICE_TCP_COMPONENT_INJECT_TOKEN } from '../../application';
import { ModuleMetadata } from '@nestjs/common';

export const CATALOGUE_SERVICE_INJECT_PROVIDER: ModuleMetadata['imports'] = [
  ClientsModule.register([
    {
      name: CATALOGUE_SERVICE_TCP_COMPONENT_INJECT_TOKEN,
      transport: Transport.TCP,
      options: {
        port: 3004,
      },
    },
  ]),
  // ClientsModule.register([
  //   {
  //     name: CATALOGUE_SERVICE_KAFKA_COMPONENT_INJECT_TOKEN,
  //     transport: Transport.KAFKA,
  //   },
  // ]),
];
