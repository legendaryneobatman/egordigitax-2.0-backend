import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AttributeService, ProductService } from '../../../application';
import { DTO } from '@repo/schemas';
import { ControllerMethods } from '../../../shared';
import {
  ApiControllerDoc,
  AttributeActions,
  ProductActions,
  ProductItem,
} from './api-docs';

export type CatalogueControllerMethods = ControllerMethods<CatalogueController>;

@ApiControllerDoc()
@Controller('catalogue')
export class CatalogueController {
  constructor(
    private readonly productService: ProductService,
    private readonly attributeService: AttributeService,
  ) {}

  @ProductActions.productGetAll()
  @Get('product')
  async productGetAll(): Promise<ProductItem[]> {
    const response = await this.productService.productFindAll();

    return response.items;
  }

  @ProductActions.productGetOne()
  @Get('product/:id')
  async productGetOne(
    @Param() params: { id: number },
  ): Promise<DTO.PRODUCT.FindOneProductResponse> {
    return await this.productService.productFindOne(params.id);
  }

  @ProductActions.productCreate()
  @Post('product')
  async productCreate(@Body() body: DTO.PRODUCT.CreateOneProductRequest) {
    return await this.productService.productCreateOne(body);
  }

  @ProductActions.productUpdate()
  @Put('product/:id')
  async productUpdate(@Body() body: DTO.PRODUCT.UpdateOneProductRequest) {
    return await this.productService.productUpdateOne(body);
  }

  @ProductActions.productDelete()
  @Delete('product/:id')
  async productDelete(@Param() params: DTO.PRODUCT.DeleteOneProductRequest) {
    return await this.productService.productDeleteOne({ id: params.id });
  }

  @AttributeActions.attributeGetAll()
  @Post('attribute-list')
  async attributeGetAll(@Body() body: DTO.ATTRIBUTE.FindManyAttributeRequest) {
    return await this.attributeService.attributeFindAll(body);
  }

  @AttributeActions.attributeGet()
  @Get('attribute/:id')
  async attributeGet(@Param() params: { id: number }) {
    return await this.attributeService.attributeFindOne(params.id);
  }

  @AttributeActions.attributeCreate()
  @Post('attribute')
  async attributeCreate(@Body() body: DTO.ATTRIBUTE.CreateOneAttributeRequest) {
    return await this.attributeService.attributeCreateOne(body);
  }

  @AttributeActions.attributeUpdate()
  @Put('attribute/:id')
  async attributeUpdate(@Body() body: DTO.ATTRIBUTE.UpdateOneAttributeRequest) {
    return await this.attributeService.attributeUpdateOne(body);
  }

  @AttributeActions.attributeDelete()
  @Delete('attribute/:id')
  async attributeDelete(
    @Param() params: DTO.ATTRIBUTE.DeleteOneAttributeRequest,
  ) {
    return await this.attributeService.attributeDeleteOne({ id: params.id });
  }
}
