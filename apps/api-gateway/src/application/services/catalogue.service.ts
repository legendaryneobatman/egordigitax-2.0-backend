import { Inject, Injectable } from '@nestjs/common';
import { CATALOGUE_SERVICE_TCP_COMPONENT_INJECT_TOKEN } from '../inject-tokens';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceMeta } from 'catalogue/dist/types';

@Injectable()
export class CatalogueService {
  constructor(
    @Inject(CATALOGUE_SERVICE_TCP_COMPONENT_INJECT_TOKEN)
    private readonly catalogueClient: ClientProxy,
  ) {}

  findOne(id: number) {
    return this.catalogueClient.send<MicroserviceMeta>(
      { cmd: 'get', service: 'catalogue' },
      { id },
    );
  }

  findAll() {}
}
