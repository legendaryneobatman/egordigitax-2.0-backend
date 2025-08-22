import { Injectable } from '@nestjs/common';
import type { RequestType, ResponseType } from '@repo/decorators';
import { CatalogueServicePatterns } from '@repo/schemas';
import { AttributeRepository } from '../../infra';
import {PaginationService} from "../helpers";

@Injectable()
export class AttributeService {
  constructor(
      private attributeRepository: AttributeRepository,
      private paginationService: PaginationService
      ) {}

  async findOne(
    data: RequestType<CatalogueServicePatterns, 'ATTRIBUTE.FIND_ONE_ATTRIBUTE'>,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.FIND_ONE_ATTRIBUTE'>
  > {
    return {
      item: await this.attributeRepository.findOne(data.id),
    };
  }

  async findMany(
    params: RequestType<
      CatalogueServicePatterns,
      'ATTRIBUTE.FIND_MANY_ATTRIBUTE'
    >,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.FIND_MANY_ATTRIBUTE'>
  > {

    return await this.paginationService.paginate(this.attributeRepository, params);
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

  async delete(
    data: RequestType<
      CatalogueServicePatterns,
      'ATTRIBUTE.DELETE_ONE_ATTRIBUTE'
    >,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'ATTRIBUTE.DELETE_ONE_ATTRIBUTE'>
  > {
    return this.attributeRepository.delete(data.id);
  }
}
