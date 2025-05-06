import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiGatewayConfig } from '@repo/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Egordigitax 2.0 backend')
    .setDescription('Ecommerce')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.enableCors(false);

  await app.startAllMicroservices();
  await app.listen(ApiGatewayConfig.httpPort); // HTTP port
  console.log(`Api-gateway started on port :${ApiGatewayConfig.httpPort}`);
}
bootstrap();
