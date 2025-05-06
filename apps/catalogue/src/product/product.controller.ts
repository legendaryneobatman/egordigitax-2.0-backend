import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MicroserviceMeta } from '../../types';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern<MicroserviceMeta>({
    cmd: 'createProduct',
    service: 'catalogue',
  })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @MessagePattern<MicroserviceMeta>({
    cmd: 'findAllProduct',
    service: 'catalogue',
  })
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern<MicroserviceMeta>({
    cmd: 'findOneProduct',
    service: 'catalogue',
  })
  findOne(@Payload() id: number) {
    return this.productService.findOne(id);
  }

  @MessagePattern<MicroserviceMeta>({
    cmd: 'updateProduct',
    service: 'catalogue',
  })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern<MicroserviceMeta>({
    cmd: 'removeProduct',
    service: 'catalogue',
  })
  remove(@Payload() id: number) {
    return this.productService.remove(id);
  }
}
