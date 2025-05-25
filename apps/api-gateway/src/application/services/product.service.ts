import { Inject, Injectable } from '@nestjs/common';
import { CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN } from '@repo/client-transport';
import { DTO } from '@repo/schemas';

@Injectable()
export class ProductService {
  constructor(
    @Inject(CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN)
    private readonly catalogueClient: CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN,
  ) {}

  productFindOne(id: number): Promise<DTO.PRODUCT.FindOneProductResponse> {
    return this.catalogueClient.sendAsync('PRODUCT.FIND_ONE_PRODUCT', { id });
  }

  productFindAll(): Promise<DTO.PRODUCT.FindManyProductResponse> {
    return this.catalogueClient.sendAsync('PRODUCT.FIND_MANY_PRODUCT', {});
  }

  productCreateOne(
    data: DTO.PRODUCT.CreateOneProductRequest,
  ): Promise<DTO.PRODUCT.CreateOneProductResponse> {
    return this.catalogueClient.sendAsync('PRODUCT.CREATE_ONE_PRODUCT', data);
  }

  productUpdateOne(
    data: DTO.PRODUCT.UpdateOneProductRequest,
  ): Promise<DTO.PRODUCT.UpdateOneProductResponse> {
    return this.catalogueClient.sendAsync('PRODUCT.UPDATE_ONE_PRODUCT', data);
  }
}
