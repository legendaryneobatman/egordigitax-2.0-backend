import { Inject, Injectable } from '@nestjs/common';
import { CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN } from '@repo/client-transport';
import { DTO } from '@repo/schemas';

@Injectable()
export class AttributeService {
  constructor(
    @Inject(CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN)
    private readonly catalogueClient: CATALOGUE_SERVICE_CLIENT_INJECT_TOKEN,
  ) {}

  attributeFindOne(
    id: number,
  ): Promise<DTO.ATTRIBUTE.FindOneAttributeResponse> {
    return this.catalogueClient.sendAsync('ATTRIBUTE.FIND_ONE_ATTRIBUTE', {
      id,
    });
  }
  attributeFindAll(
    data: DTO.ATTRIBUTE.FindManyAttributeRequest,
  ): Promise<DTO.ATTRIBUTE.FindManyAttributeResponse> {
    return this.catalogueClient.sendAsync(
      'ATTRIBUTE.FIND_MANY_ATTRIBUTE',
      data,
    );
  }
  attributeCreateOne(
    data: DTO.ATTRIBUTE.CreateOneAttributeRequest,
  ): Promise<DTO.ATTRIBUTE.CreateOneAttributeResponse> {
    return this.catalogueClient.sendAsync(
      'ATTRIBUTE.CREATE_ONE_ATTRIBUTE',
      data,
    );
  }
  attributeUpdateOne(
    data: DTO.ATTRIBUTE.UpdateOneAttributeRequest,
  ): Promise<DTO.ATTRIBUTE.UpdateOneAttributeResponse> {
    return this.catalogueClient.sendAsync(
      'ATTRIBUTE.UPDATE_ONE_ATTRIBUTE',
      data,
    );
  }

  attributeDeleteOne(
    data: DTO.ATTRIBUTE.DeleteOneAttributeRequest,
  ): Promise<DTO.ATTRIBUTE.DeleteOneAttributeResponse> {
    return this.catalogueClient.sendAsync(
      'ATTRIBUTE.DELETE_ONE_ATTRIBUTE',
      data,
    );
  }
}
