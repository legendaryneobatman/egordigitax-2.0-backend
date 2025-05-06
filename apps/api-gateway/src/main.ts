import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  await app.listen(3000); // HTTP port
  console.log('Api-gateway microservice started on port :3001');
}
bootstrap();
