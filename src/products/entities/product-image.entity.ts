import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class ProductIamge extends Document {
  
    @Prop()
    url:string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    product:string;
}

export const producImageSchema = SchemaFactory.createForClass(ProductIamge);