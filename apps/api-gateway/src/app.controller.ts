import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/')
export class AppController {

  @Get()
  test() {
    console.log('asdasd')
    return 'api-gateway appController test handler'
  }
}
