import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema:JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule
  ],
})
export class AppModule {}
