import { Injectable } from '@nestjs/common';
import type { RequestType } from '@repo/decorators';
import { CatalogueServicePatterns } from '@repo/schemas';
import { ProductRepository } from '../../infra';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  async findOne(
    data: RequestType<CatalogueServicePatterns, 'PRODUCT.FIND_ONE_PRODUCT'>,
  ) {
    return {
      item: await this.productRepository.findOne(data.id),
    };
  }

  async findMany() {
    return {
      items: await this.productRepository.findAll(),
    };
  }

  async create(
    data: RequestType<CatalogueServicePatterns, 'PRODUCT.CREATE_ONE_PRODUCT'>,
  ) {
    return this.productRepository.create(data);
  }

  async update(
    data: RequestType<CatalogueServicePatterns, 'PRODUCT.UPDATE_ONE_PRODUCT'>,
  ) {
    return this.productRepository.update(data.id, data);
  }

  async delete(
    data: RequestType<CatalogueServicePatterns, 'PRODUCT.DELETE_ONE'>,
  ) {
    return this.productRepository.delete(data.id);
  }
}
