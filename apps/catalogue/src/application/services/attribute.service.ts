import { Injectable } from '@nestjs/common';
import type { RequestType, ResponseType } from '@repo/decorators';
import { CatalogueServicePatterns } from '@repo/schemas';
import { AttributeRepository } from '../../infra';

@Injectable()
export class AttributeService {
  constructor(private attributeRepository: AttributeRepository) {}

  async findOne(
    data: RequestType<CatalogueServicePatterns, 'ATTRIBUTE.FIND_ONE_ATTRIBUTE'>,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.FIND_ONE_ATTRIBUTE'>
  > {
    return {
      item: await this.attributeRepository.findOne(data.id),
    };
  }

  async fineMany(): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.FIND_MANY_ATTRIBUTE'>
  > {
    return {
      items: await this.attributeRepository.findAll(),
    };
  }

  async create(
    data: RequestType<
      CatalogueServicePatterns,
      'ATTRIBUTE.CREATE_ONE_ATTRIBUTE'
    >,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.CREATE_ONE_ATTRIBUTE'>
  > {
    return this.attributeRepository.model.create({ data });
  }

  async update(
    data: RequestType<
      CatalogueServicePatterns,
      'ATTRIBUTE.UPDATE_ONE_ATTRIBUTE'
    >,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.UPDATE_ONE_ATTRIBUTE'>
  > {
    return this.attributeRepository.model.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
