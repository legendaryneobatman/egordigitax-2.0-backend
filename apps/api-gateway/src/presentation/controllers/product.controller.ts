import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CATALOGUE_SERVICE_TCP_COMPONENT_INJECT_TOKEN } from '../../application';
import { MicroserviceMeta } from 'catalogue/dist/types';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(CATALOGUE_SERVICE_TCP_COMPONENT_INJECT_TOKEN)
    private readonly catalogueClient: ClientProxy,
  ) {}

  @Get()
  getProducts() {
    return this.catalogueClient.send<MicroserviceMeta>(
      {
        cmd: 'findAllProduct',
        service: 'catalogue',
      },
      {},
    );
  }
}
