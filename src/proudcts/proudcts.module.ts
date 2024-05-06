import { Module } from '@nestjs/common';
import { ProudctsService } from './proudcts.service';
import { ProudctsController } from './proudcts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Proudct } from './entities/proudct.entity';

@Module({
  controllers: [ProudctsController],
  providers: [ProudctsService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Proudct.name,
        schema:ProductSchema
      }
    ])
  ]
})
export class ProudctsModule {}
