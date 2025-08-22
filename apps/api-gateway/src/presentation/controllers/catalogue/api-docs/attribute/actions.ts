import { CatalogueControllerMethods } from '../../catalogue.controller';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  AttributeItem,
  CreateAttributeRequest,
  FindManyAttributeRequest,
  FindManyAttributeResponse,
  UpdateAttributeRequest,
} from './dto';

export class AttributeActions implements CatalogueControllerMethods {
  static attributeCreate() {
    return applyDecorators(
      ApiOperation({ summary: 'Создать характеристику товара' }),
      ApiBody({
        description: 'Данные характеристики',
        examples: {
          default: {
            value: {
              name: 'Материал',
              type: 'MATERIAL',
              description: 'Основной материал изготовления',
              unit: null,
            },
          },
        },
        type: CreateAttributeRequest,
      }),
    );
  }

  static attributeGet() {
    return applyDecorators(
      ApiOperation({
        summary: 'Получить одну характеристику по идентификатору',
      }),
      ApiResponse({
        status: 200,
        description: 'Характеристика',
        type: AttributeItem,
      }),
    );
  }

  static attributeGetAll() {
    return applyDecorators(
      ApiOperation({
        summary:
          'Получить пагинированный сортированный список характеристик по фильтру',
      }),
      ApiBody({
        description: 'Параметры для фильтрации, сортировки и пагинации',
        examples: {
          default: {
            value: {
              dto: {
                name: 'Материал',
                type: 'MATERIAL',
                description: 'Основной материал изготовления',
                unit: null,
              },
              page: 0,
              size: 10,
              sort: [{ field: 'name', order: 'ASC' }],
            },
          },
        },
        type: FindManyAttributeRequest,
      }),
      ApiResponse({
        status: 200,
        description: 'Список характеристик',
        type: FindManyAttributeResponse,
        example: {
          dto: {
            name: 'Материал',
            type: 'MATERIAL',
            description: 'Основной материал изготовления',
            unit: null,
          },
          page: 0,
          size: 10,
          sort: [
            {
              field: 'name',
              order: 'ASC',
            },
          ],
        },
      }),
    );
  }

  static attributeUpdate() {
    return applyDecorators(
      ApiOperation({ summary: 'Изменить данные характеристики' }),
      ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор характеристики',
        required: true,
      }),
      ApiBody({
        type: UpdateAttributeRequest,
        description: 'Новые данные характеристики',
      }),
      ApiResponse({
        description: 'Возвращает обновленную характеристики',
      }),
    );
  }

  static attributeDelete() {
    return applyDecorators(
      ApiOperation({ summary: 'Удалить характеристику, не удаляет свойства' }),
      ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор характеристики',
        required: true,
      }),
    );
  }
}
