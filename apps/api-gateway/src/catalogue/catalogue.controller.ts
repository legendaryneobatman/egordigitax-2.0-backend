import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';

export class CatalogueItem {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  image: string;
}


@ApiTags('Catalogue')
@Controller('catalogue')
export class CatalogueController {

  @Get()
  @ApiOperation({ summary: 'Get all catalogue items' })
  @ApiResponse({
    status: 200,
    description: 'List of catalogue items',
    type: [CatalogueItem],
  })
  getItems(): CatalogueItem[] {
    return [
      {
        "name": "Tasty Concrete Keyboard",
        "description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
        "price": "677.00",
        "image": "http://placeimg.com/640/480/fashion"
      },
      {
        "name": "Ergonomic Metal Salad",
        "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
        "price": "751.00",
        "image": "http://placeimg.com/640/480/fashion"
      },
      {
        "name": "Tasty Wooden Mouse",
        "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
        "price": "433.00",
        "image": "http://placeimg.com/640/480/fashion"
      },
      {
        "name": "Handmade Fresh Bike",
        "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
        "price": "929.00",
        "image": "http://placeimg.com/640/480/fashion"
      },
      {
        "name": "Practical Fresh Chair",
        "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        "price": "551.00",
        "image": "http://placeimg.com/640/480/fashion"
      },
      {
        "name": "Awesome Rubber Cheese",
        "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
        "price": "181.00",
        "image": "http://placeimg.com/640/480/fashion"
      },
    ];
  }
}
