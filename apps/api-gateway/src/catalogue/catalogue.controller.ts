import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';
import { CatalogueService } from './catalogue.service';

export class CatalogueItem {
  @ApiProperty()
  id: number;

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
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get()
  @ApiOperation({ summary: 'Get all catalogue items' })
  @ApiResponse({
    status: 200,
    description: 'List of catalogue items',
    type: [CatalogueItem],
  })
  getItems(): CatalogueItem[] {
    return this.catalogueService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get catalogue item by id' })
  @ApiResponse({
    status: 200,
    description: 'List of catalogue items',
    type: CatalogueItem,
  })
  get(@Param() params: { id: number }): CatalogueItem {
    return this.catalogueService.findOne(params.id)
  }
}
