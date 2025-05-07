import { Inject, Injectable } from '@nestjs/common';
import { CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN } from '@repo/client-transport';
import { DTO } from '@repo/schemas';

@Injectable()
export class CatalogueService {
  constructor(
    @Inject(CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN)
    private readonly catalogueClient: CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN,
  ) {}

  findOne(id: number): Promise<DTO.PRODUCT.FindOneProductResponse> {
    return this.catalogueClient.sendAsync('PRODUCT.FIND_ONE_PRODUCT', { id });
  }

  findAll(): Promise<DTO.PRODUCT.FindManyProductResponse> {
    return this.catalogueClient.sendAsync('PRODUCT.FIND_MANY_PRODUCT', {});
  }

  createOne(
    data: DTO.PRODUCT.CreateOneProductRequest,
  ): Promise<DTO.PRODUCT.CreateOneProductResponse> {
    return this.catalogueClient.sendAsync('PRODUCT.CREATE_ONE_PRODUCT', data);
  }
}
