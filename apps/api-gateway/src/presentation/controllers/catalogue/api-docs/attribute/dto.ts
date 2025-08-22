import { ApiProperty } from '@nestjs/swagger';
import { Sort } from '@repo/schemas';

type IAttributeType =
  | 'COLOR'
  | 'SIZE'
  | 'MATERIAL'
  | 'DROPDOWN'
  | 'BOOLEAN'
  | 'NUMERIC';

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
export class FindManyAttributeRequest {
  dto: AttributeItem;
  page: number;
  size: number;
  sort: Sort[];
}
export class FindManyAttributeResponse {
  items: AttributeItem[];
  page: number;
  totalElements: number;
  totalPages: number;
}
