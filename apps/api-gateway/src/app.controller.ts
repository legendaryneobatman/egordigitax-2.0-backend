import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/')
export class AppController {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientProxy,
  ) {}
}
