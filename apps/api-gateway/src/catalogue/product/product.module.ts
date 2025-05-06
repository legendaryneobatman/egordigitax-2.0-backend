import { Module } from '@nestjs/common';
import { ProductService } from '../../application/services/product.service';
import { ProductController } from '../../presentation/controllers/product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATALOGUE_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: 3004,
        },
      },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
