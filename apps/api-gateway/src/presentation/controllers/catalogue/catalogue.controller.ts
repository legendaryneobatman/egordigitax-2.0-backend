import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CatalogueService } from '../../../application';
import { DTO } from '@repo/schemas';
import { AutoSwagger, ProductItem } from './catalogue.swagger';

@AutoSwagger()
@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get()
  async getItems(): Promise<ProductItem[]> {
    const response = await this.catalogueService.productFindAll();

    return response.items;
  }

  @Get(':id')
  async get(@Param() params: { id: number }): Promise<ProductItem> {
    const response = await this.catalogueService.productFindOne(params.id);

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
  async createOne(@Body() body: DTO.PRODUCT.CreateOneProductRequest) {
    return await this.catalogueService.productCreateOne(body);
  }

  @Put(':id')
  async updateOne(@Body() body: DTO.PRODUCT.UpdateOneProductRequest) {
    return await this.catalogueService.productUpdateOne(body);
  }
}
