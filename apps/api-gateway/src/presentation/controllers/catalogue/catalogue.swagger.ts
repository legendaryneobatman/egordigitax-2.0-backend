// catalogue.swagger.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  getSchemaPath,
  ApiProperty,
} from '@nestjs/swagger';

export class ProductItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  oldPrice: number;

  @ApiProperty()
  discount: number;
}

export class CreateProductResponse extends ProductItem {}
export class CreateProductRequest extends ProductItem {}
export class UpdateProductRequest extends ProductItem {}

export function AutoSwagger() {
  return (target: any) => {
    // Применяем контроллер-декораторы
    CatalogueDocs.Swagger.Controller(target);

    // Автоматически применяем декораторы к методам
    const methodDecorators = CatalogueDocs.Swagger.Methods;

    Object.keys(methodDecorators).forEach((methodName) => {
      const descriptor = Object.getOwnPropertyDescriptor(
        target.prototype,
        methodName,
      );

      if (descriptor) {
        const decorators = methodDecorators[methodName];
        Reflect.decorate(
          [decorators],
          target.prototype,
          methodName,
          descriptor,
        );
      }
    });
  };
}

export class CatalogueDocs {
  static get Swagger() {
    return {
      Controller: applyDecorators(
        ApiTags('Catalogue'),
        ApiResponse({ status: 500, description: 'Internal Server Error' }),
      ),
      Methods: {
        getItems: applyDecorators(
          ApiOperation({ summary: 'Get all catalogue items' }),
          ApiResponse({
            status: 200,
            description: 'List of catalogue items',
            schema: {
              type: 'array',
              items: { $ref: getSchemaPath(ProductItem) },
            },
          }),
        ),
        get: applyDecorators(
          ApiOperation({ summary: 'Get catalogue item by id' }),
          ApiParam({ name: 'id', type: Number, description: 'Product ID' }),
          ApiResponse({
            status: 200,
            description: 'Product item details',
            type: ProductItem,
          }),
          ApiResponse({ status: 404, description: 'Product not found' }),
        ),
        createOne: applyDecorators(
          ApiOperation({
            summary: 'Create product',
          }),
          ApiParam({
            name: 'id',
            description: 'Id of product to update',
            required: true,
          }),
          ApiBody({
            description: 'Product data',
            examples: {
              default: {
                value: {
                  name: 'name',
                  description: 'description',
                  image: 'https://placehold.co/600x400',
                  price: 90,
                  oldPrice: 100,
                  discount: 10,
                },
              },
            },
            type: CreateProductRequest,
          }),
          ApiResponse({
            status: 201,
            description: 'Returns created product',
            type: CreateProductResponse,
          }),
        ),
        updateOne: applyDecorators(
          ApiOperation({ summary: 'Change existing product content' }),
          ApiBody({
            type: UpdateProductRequest,
            description: 'New content',
          }),
          ApiResponse({
            description: 'Returns updated product',
          }),
        ),
      },
    };
  }
}
