import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema:JoiValidationSchema
    }),
    MongooseModule.forRoot(process.env.MONGO_DB)
  ],
})
export class AppModule {}
