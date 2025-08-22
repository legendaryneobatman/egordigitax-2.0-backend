import { CatalogueControllerMethods } from '../../catalogue.controller';

import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  CreateProductRequest,
  CreateProductResponse,
  ProductItem,
  UpdateProductRequest,
} from './dto';

export class ProductActions implements CatalogueControllerMethods {
  static productCreate() {
    return applyDecorators(
      ApiTags('product'),
      ApiOperation({
        summary: 'Создать товар',
      }),
      ApiBody({
        description: 'Данные для создания товара',
        examples: {
          default: {
            value: {
              name: 'name',
              description: 'description',
              image: 'https://placehold.co/600x400',
              price: 90,
              oldPrice: 100,
              discount: 10,
              SKU: 'XIA-REDMI-N12-256GB',
              weight: 0.45,
              status: 'ACTIVE',
            },
          },
        },
        type: CreateProductRequest,
      }),
      ApiResponse({
        status: 201,
        description: 'Возвращается созданый товар',
        type: CreateProductResponse,
      }),
    );
  }
  static productGetAll() {
    return applyDecorators(
      ApiTags('product'),
      ApiOperation({ summary: 'Получить список товаров' }),
      ApiResponse({
        status: 200,
        description: 'Список товаров',
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath(ProductItem) },
        },
      }),
    );
  }
  static productGetOne() {
    return applyDecorators(
      ApiTags('product'),
      ApiOperation({ summary: 'Получить товар по id' }),
      ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор товара',
      }),
      ApiResponse({
        status: 200,
        description: 'Товар',
        type: ProductItem,
      }),
      ApiResponse({ status: 404, description: 'Товар не найден' }),
    );
  }
  static productUpdate() {
    return applyDecorators(
      ApiTags('product'),
      ApiOperation({ summary: 'Изменить товар' }),
      ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор товара',
        required: true,
      }),
      ApiBody({
        type: UpdateProductRequest,
        description: 'New content',
      }),
      ApiResponse({
        description: 'Returns updated product',
      }),
    );
  }

  static productDelete() {
    return applyDecorators(
      ApiTags('product'),
      ApiOperation({ summary: 'Удалить товар, не удаляет характеристики' }),
      ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор товара',
        required: true,
      }),
    );
  }
}
