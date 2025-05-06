import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';
import { CatalogueService } from '../../application';

export class CatalogueItem {
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
}

@ApiTags('Catalogue')
@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get()
  @ApiOperation({ summary: 'Get all catalogue items' })
  @ApiResponse({
    status: 200,
    description: 'List of catalogue items',
    type: [CatalogueItem],
  })
  async getItems(): Promise<CatalogueItem[]> {
    const response = await this.catalogueService.findAll();

    return response.items;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get catalogue item by id' })
  @ApiResponse({
    status: 200,
    description: 'List of catalogue items',
    type: CatalogueItem,
  })
  async get(@Param() params: { id: number }): Promise<CatalogueItem> {
    const response = await this.catalogueService.findOne(params.id);

    return {
      id: response.item.id,
      name: response.item.name,
      description: response.item.description,
      price: response.item.price,
      image: response.item.image,
    };
  }
}
