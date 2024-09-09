import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
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
  @Prop()
  tags:string[]
  //imagens
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductIamge' }] })
  images:string[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user:string
  
}


 const productSchema = SchemaFactory.createForClass(Product);

 productSchema.pre(['save',], async function(next) {
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
productSchema.pre('updateOne', async function(next) {
  const update = this.getUpdate(); // Get the update
//todo investigar por que no funcionan
  // If title is being updated and slug is not provided in update
  if (update['$set'] && update['$set'].title ) {
    let newSlug:string;
    const title = update['$get'].title as string;

     newSlug = title
        .toLowerCase()
        .replace(/ /g, '_')
        .replace(/'/g, '');


    // Update slug in the update object
    update['$set'].slug = newSlug;
  }
  if (update['$set'] && update['$set'].slug) {
    let newSlug:string;
    const slug = update['$set'].slug as string;
  
     newSlug = slug
     .toLowerCase()
     .replace(/ /g, '_')
     .replace(/'/g, '');
    

    // Update slug in the update object
    update['$set'].slug = newSlug;
  }

  next();
});

export const ProductSchema = productSchema;