import { ApiProperty } from '@nestjs/swagger';

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
    example: 'ABC-12345-S-BL',
    format:
      'ABC-12345-S-BL (Brand: ABC, Product ID: 12345, Size: Small, Color: Blue)',
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
