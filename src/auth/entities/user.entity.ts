import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({unique:true})
    email:string;
    @Prop({select:false})// no envia este campo
    password:string;
    @Prop({})
    fullName:string;
    @Prop({default:true})
    isActive:boolean;
    @Prop({default:['user']})
    roles:string[];


}

export const UserSchema = SchemaFactory.createForClass(User);