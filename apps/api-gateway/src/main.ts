import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.startAllMicroservices();
  await app.listen(3000); // HTTP port
  console.log("Api-gateway microservice started on port :3001")
}
bootstrap();
