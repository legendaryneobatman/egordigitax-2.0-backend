import { Controller } from '@nestjs/common';
import {
  createTypedDecorators,
  type RequestType,
  type ResponseType,
} from '@repo/decorators';
import { CatalogueServicePatterns } from '@repo/schemas';

const { MessagePattern, Payload } =
  createTypedDecorators<CatalogueServicePatterns>();

@Controller()
export class ProductController {
  @MessagePattern('PRODUCT.FIND_ONE_PRODUCT')
  async findOne(
    @Payload('PRODUCT.FIND_ONE_PRODUCT')
    data: RequestType<CatalogueServicePatterns, 'PRODUCT.FIND_ONE_PRODUCT'>,
  ): Promise<
    ResponseType<CatalogueServicePatterns, 'PRODUCT.FIND_ONE_PRODUCT'>
  > {
    return {
      item: {
        id: data.id,
        name: 'name',
        description: '',
        image: '',
        price: 0,
        oldPrice: 0,
        discount: 0,
      },
    };
  }

  @MessagePattern('PRODUCT.FIND_MANY_PRODUCT')
  async findMany(): Promise<
    ResponseType<CatalogueServicePatterns, 'PRODUCT.FIND_MANY_PRODUCT'>
  > {
    return {
      items: [
        {
          id: 1,
          name: 'name',
          description: '',
          image: '',
          price: 0,
          oldPrice: 0,
          discount: 0,
        },
        {
          id: 2,
          name: 'name',
          description: '',
          image: '',
          price: 0,
          oldPrice: 0,
          discount: 0,
        },
        {
          id: 3,
          name: 'name',
          description: '',
          image: '',
          price: 0,
          oldPrice: 0,
          discount: 0,
        },
      ],
    };
  }
}
