import { Injectable } from '@nestjs/common';
import { AttributeService } from '../../application';
import {
  createTypedDecorators,
  type RequestType,
  type ResponseType,
} from '@repo/decorators';
import { CatalogueServicePatterns } from '@repo/schemas';

const { MessagePattern, Payload } =
  createTypedDecorators<CatalogueServicePatterns>();

@Injectable()
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @MessagePattern('ATTRIBUTE.FIND_ONE_ATTRIBUTE')
  async findOne(
    @Payload('ATTRIBUTE.FIND_ONE_ATTRIBUTE')
    data: RequestType<CatalogueServicePatterns, 'ATTRIBUTE.FIND_ONE_ATTRIBUTE'>,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.FIND_ONE_ATTRIBUTE'>
  > {
    return await this.attributeService.findOne(data);
  }

  @MessagePattern('ATTRIBUTE.FIND_MANY_ATTRIBUTE')
  async findMany(
    @Payload('ATTRIBUTE.FIND_MANY_ATTRIBUTE')
    data: RequestType<
      CatalogueServicePatterns,
      'ATTRIBUTE.FIND_MANY_ATTRIBUTE'
    >,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.FIND_MANY_ATTRIBUTE'>
  > {
    return await this.attributeService.findMany(data);
  }

  @MessagePattern('ATTRIBUTE.CREATE_ONE_ATTRIBUTE')
  async createOne(
    @Payload('ATTRIBUTE.CREATE_ONE_ATTRIBUTE')
    data: RequestType<
      CatalogueServicePatterns,
      'ATTRIBUTE.CREATE_ONE_ATTRIBUTE'
    >,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.CREATE_ONE_ATTRIBUTE'>
  > {
    return await this.attributeService.create(data);
  }

  @MessagePattern('ATTRIBUTE.UPDATE_ONE_ATTRIBUTE')
  async updateOne(
    @Payload('ATTRIBUTE.UPDATE_ONE_ATTRIBUTE')
    data: RequestType<
      CatalogueServicePatterns,
      'ATTRIBUTE.UPDATE_ONE_ATTRIBUTE'
    >,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.UPDATE_ONE_ATTRIBUTE'>
  > {
    return await this.attributeService.update(data);
  }

  @MessagePattern('ATTRIBUTE.DELETE_ONE_ATTRIBUTE')
  async deleteOne(
    @Payload('ATTRIBUTE.DELETE_ONE_ATTRIBUTE')
    data: RequestType<
      CatalogueServicePatterns,
      'ATTRIBUTE.DELETE_ONE_ATTRIBUTE'
    >,
  ) {
    await this.attributeService.delete(data);
  }
}
