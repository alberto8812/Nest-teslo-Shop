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


 const productSchema = SchemaFactory.createForClass(Product);

 productSchema.pre('save', async function(next) {
  if(!this.slug){
    this.slug=this.title
    .toLowerCase()
    .replaceAll(' ','_')
    .replaceAll("'",'')
  }else{

    this.slug=this.slug
    .toLowerCase()
    .replaceAll(' ','_')
    .replaceAll("'",'')
  }

  next()
})

export const ProductSchema = productSchema;