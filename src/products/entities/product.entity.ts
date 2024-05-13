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

  // If title is being updated and slug is not provided in update
  if (update['$set'] && update['$set'].title && !update['$set'].slug) {
    let newSlug:string;
    const title = update['$set'].title as string;
    const slug = update['$set'].slug as string;
    if(title){

     newSlug = title
        .toLowerCase()
        .replace(/ /g, '_')
        .replace(/'/g, '');
    }else{
      
     newSlug = slug
     .toLowerCase()
     .replace(/ /g, '_')
     .replace(/'/g, '');
    }

    // Update slug in the update object
    update['$set'].slug = slug;
  }

  next();
});

export const ProductSchema = productSchema;