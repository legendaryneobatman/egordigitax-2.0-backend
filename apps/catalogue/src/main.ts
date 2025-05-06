import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CatalogueConfig, SharedConfig } from '@repo/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: SharedConfig.isUseNamespaceAsHost
          ? CatalogueConfig.namespace
          : 'localhost',
        port: CatalogueConfig.tcpPort,
      },
    },
  );

  await app.listen();
}
bootstrap();
