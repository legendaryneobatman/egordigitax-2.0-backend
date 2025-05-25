import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AttributeService, ProductService } from '../../../application';
import { DTO } from '@repo/schemas';
import { AutoSwagger, ProductItem } from './catalogue.swagger';

@AutoSwagger()
@Controller('catalogue')
export class CatalogueController {
  constructor(
    private readonly productService: ProductService,
    private readonly attributeService: AttributeService,
  ) {}

  @Get('product')
  async productGetAll(): Promise<ProductItem[]> {
    const response = await this.productService.productFindAll();

    return response.items;
  }

  @Get('product/:id')
  async productGetOne(@Param() params: { id: number }): Promise<ProductItem> {
    const response = await this.productService.productFindOne(params.id);

    return {
      id: response.item.id,
      name: response.item.name,
      description: response.item.description,
      image: response.item.image,
      price: response.item.price,
      discount: response.item.discount,
      oldPrice: response.item.oldPrice,
      SKU: response.item.SKU,
      status: response.item.status,
      weight: response.item.weight,
    };
  }

  @Post('product')
  async productCreate(@Body() body: DTO.PRODUCT.CreateOneProductRequest) {
    return await this.productService.productCreateOne(body);
  }

  @Put('product/:id')
  async productUpdate(@Body() body: DTO.PRODUCT.UpdateOneProductRequest) {
    return await this.productService.productUpdateOne(body);
  }

  @Get('attribute')
  async attributeGetAll() {
    return await this.attributeService.attributeFindAll();
  }

  @Get('attribute/:id')
  async attributeGet(@Param() params: { id: number }) {
    return await this.attributeService.attributeFindOne(params.id);
  }

  @Post('attribute/:id')
  async attributeCreate(@Body() body: DTO.ATTRIBUTE.CreateOneAttributeRequest) {
    return await this.attributeService.attributeCreateOne(body);
  }

  @Put('attribute/:id')
  async attributeUpdate(@Body() body: DTO.ATTRIBUTE.UpdateOneAttributeRequest) {
    return await this.attributeService.attributeUpdateOne(body);
  }
}
