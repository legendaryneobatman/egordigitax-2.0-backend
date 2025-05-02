import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: 3009,
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
