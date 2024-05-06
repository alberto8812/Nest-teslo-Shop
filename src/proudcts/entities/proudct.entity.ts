import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose'
@Schema()
export class Proudct extends Document {
  @Prop({
    unique: true,
    index:true
   })
  title: string;
}

export const ProductSchema=SchemaFactory.createForClass(Proudct);
