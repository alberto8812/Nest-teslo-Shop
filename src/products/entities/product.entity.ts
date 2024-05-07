import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Product extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  title: string;

  @Prop({
    default: 0,
    index:true
  })
  price: number;

  @Prop({
   index:true
  })
  descrption: string;

  @Prop({
    unique:true
  })
  slug:string

  @Prop({})
  stock:number

  @Prop()
  sizes:string[]

  @Prop()
  gender:string

  //tags
  //imagens
}

export const ProductSchema = SchemaFactory.createForClass(Product);
