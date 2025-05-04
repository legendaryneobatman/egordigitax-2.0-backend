import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  await app.listen(3000); // HTTP port
  console.log("Api-gateway microservice started on port :3001")
}
bootstrap();
