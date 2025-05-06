import { Controller, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CatalogueItem } from 'api-gateway/dist/src/presentation/controllers/catalogue.controller';
import { MessagePattern } from '@nestjs/microservices';
import { MicroserviceMeta } from '../types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern<MicroserviceMeta>({ cmd: 'get', service: 'catalogue' })
  get(@Param() params: { id: number }): CatalogueItem {
    return this.appService.findOne(params.id);
  }
}
