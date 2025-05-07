import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';
import { CatalogueService } from '../../application';
import { DTO } from '@repo/schemas';

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

  @ApiProperty()
  oldPrice: number;

  @ApiProperty()
  discount: number;
}

export class CreateProductDto extends CatalogueItem {}

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
      image: response.item.image,
      price: response.item.price,
      discount: response.item.discount,
      oldPrice: response.item.oldPrice,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create product',
  })
  @ApiResponse({
    status: '2XX',
    description: 'Returns created item',
    type: CreateProductDto,
  })
  async createOne(@Body() body: DTO.PRODUCT.CreateOneProductRequest) {
    return await this.catalogueService.createOne(body);
  }
}
