import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiGatewayConfig } from '@repo/config';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(false);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Egordigitax 2.0 backend')
    .setDescription('Ecommerce')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: false,
    });

  SwaggerModule.setup('api/swagger-ui', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });
  await app.startAllMicroservices();
  await app.listen(ApiGatewayConfig.httpPort); // HTTP port
  console.log(`Api-gateway started on port :${ApiGatewayConfig.httpPort}`);
}
bootstrap();
