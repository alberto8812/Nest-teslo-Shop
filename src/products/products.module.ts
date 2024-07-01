import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductIamge, ProductSchema, producImageSchema } from './entities';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[
    AuthModule,
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
