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

type IAttributeType =
  | 'COLOR'
  | 'SIZE'
  | 'MATERIAL'
  | 'DROPDOWN'
  | 'BOOLEAN'
  | 'NUMERIC';

export class ProductItem {
  @ApiProperty({
    description: 'Уникальный идентификатор товара',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Название товара',
    example: 'Смартфон Xiaomi Redmi Note 12',
  })
  name: string;

  @ApiProperty({
    description: 'Подробное описание товара',
    example: '6.67" AMOLED, 120 Гц, Snapdragon 4 Gen 1, 5000 мА·ч',
  })
  description: string;

  @ApiProperty({
    description: 'Текущая цена товара в валюте',
    example: 299.99,
  })
  price: number;

  @ApiProperty({
    description: 'URL основного изображения товара',
    example: 'https://example.com/images/xiaomi-redmi-note12.jpg',
  })
  image: string;

  @ApiProperty({
    description: 'Старая цена для отображения скидки (если есть)',
    example: 349.99,
  })
  oldPrice: number;

  @ApiProperty({
    description: 'Процент скидки (рассчитывается автоматически)',
    example: 14,
  })
  discount: number;

  @ApiProperty({
    description: 'Уникальный артикул товара (SKU)',
    example: 'XIA-REDMI-N12-256GB',
  })
  SKU: string;

  @ApiProperty({
    description: 'Вес товара в килограммах',
    example: 0.45,
  })
  weight: number;

  @ApiProperty({
    enum: ['ACTIVE', 'DISABLED', 'ARCHIVED'],
    description: `Статус товара в системе. Возможные значения: 
      ACTIVE - доступен для заказа, 
      DISABLED - временно недоступен, 
      ARCHIVED - снят с продаж`,
    example: 'ACTIVE',
  })
  status: string;
}

export class CreateProductResponse extends ProductItem {}

export class CreateProductRequest extends ProductItem {}

export class UpdateProductRequest extends ProductItem {}

export class AttributeItem {
  @ApiProperty({
    description: 'Уникальный идентификатор аттрибута',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Название аттрибута',
    example: 'Атрибут №1',
  })
  name: string;

  @ApiProperty({
    description: 'Описание аттрибута',
    example: 'Примерное описание аттрибута',
  })
  description: string;

  @ApiProperty({
    description: 'Мера измерения аттрибута',
    example: 'см',
  })
  unit: string;

  @ApiProperty({
    description: 'Уникальный идентификатор аттрибута',
    example: 'COLOR',
    enum: ['COLOR', 'SIZE', 'MATERIAL', 'DROPDOWN', 'BOOLEAN', 'NUMERIC'],
  })
  type: IAttributeType;
}
export class CreateAttributeRequest extends AttributeItem {}
export class UpdateAttributeRequest extends AttributeItem {}

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
        productGetAll: applyDecorators(
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
        productGetOne: applyDecorators(
          ApiOperation({ summary: 'Get catalogue item by id' }),
          ApiParam({ name: 'id', type: Number, description: 'Product ID' }),
          ApiResponse({
            status: 200,
            description: 'Product item details',
            type: ProductItem,
          }),
          ApiResponse({ status: 404, description: 'Product not found' }),
        ),
        productCreate: applyDecorators(
          ApiOperation({
            summary: 'Create product',
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
            description: 'Returns created product',
            type: CreateProductResponse,
          }),
        ),
        productUpdate: applyDecorators(
          ApiOperation({ summary: 'Change existing product content' }),
          ApiParam({
            name: 'id',
            type: Number,
            description: 'Id of product to update',
            required: true,
          }),
          ApiBody({
            type: UpdateProductRequest,
            description: 'New content',
          }),
          ApiResponse({
            description: 'Returns updated product',
          }),
        ),
        attributeGetAll: applyDecorators(
          ApiOperation({ summary: 'Get all attribute items' }),
          ApiParam({ name: 'id', type: Number, description: 'Product ID' }),
          ApiResponse({
            status: 200,
            description: 'List of attribute items',
            schema: {
              type: 'array',
              items: { $ref: getSchemaPath(AttributeItem) },
            },
          }),
        ),
        attributeGet: applyDecorators(
          ApiOperation({ summary: 'Gen one attribute by id' }),
          ApiResponse({
            status: 200,
            description: 'Attribute item',
            type: AttributeItem,
          }),
        ),
        attributeCreate: applyDecorators(
          ApiOperation({ summary: 'Create new attribute' }),
          ApiBody({
            description: 'Attribute data',
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
            type: CreateAttributeRequest,
          }),
        ),
        attributeUpdate: applyDecorators(
          ApiOperation({ summary: 'Change existing attribute content' }),
          ApiParam({
            name: 'id',
            type: Number,
            description: 'Id of attribute to update',
            required: true,
          }),
          ApiBody({
            type: UpdateAttributeRequest,
            description: 'New content',
          }),
          ApiResponse({
            description: 'Returns updated attribute',
          }),
        ),
      },
    };
  }
}
