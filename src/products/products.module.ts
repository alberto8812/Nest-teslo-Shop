import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductIamge, ProductSchema, producImageSchema } from './entities';


@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Product.name,
        schema:ProductSchema
      },
      {
        name:ProductIamge.name,
        schema:producImageSchema
      }
    ])
  ],

  exports:[ProductsService]
})
export class ProductsModule {}
