import { Controller } from '@nestjs/common';
import {
  createTypedDecorators,
  type RequestType,
  type ResponseType,
} from '@repo/decorators';
import { CatalogueServicePatterns } from '@repo/schemas';
import { ProductService } from '../../application';

const { MessagePattern, Payload } =
  createTypedDecorators<CatalogueServicePatterns>();

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('PRODUCT.FIND_ONE_PRODUCT')
  async findOne(
    @Payload('PRODUCT.FIND_ONE_PRODUCT')
    data: RequestType<CatalogueServicePatterns, 'PRODUCT.FIND_ONE_PRODUCT'>,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'PRODUCT.FIND_ONE_PRODUCT'>
  > {
    return this.productService.findOne(data);
  }

  @MessagePattern('PRODUCT.FIND_MANY_PRODUCT')
  async findMany(): Promise<
    ResponseType<CatalogueServicePatterns, 'PRODUCT.FIND_MANY_PRODUCT'>
  > {
    return this.productService.findMany();
  }

  @MessagePattern('PRODUCT.CREATE_ONE_PRODUCT')
  async createOne(
    data: RequestType<CatalogueServicePatterns, 'PRODUCT.CREATE_ONE_PRODUCT'>,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'PRODUCT.CREATE_ONE_PRODUCT'>
  > {
    return this.productService.create(data);
  }
}
