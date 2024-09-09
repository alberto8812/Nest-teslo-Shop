import { ObjectId } from "mongoose"

export interface JwtPayload {
    email:string
    id:ObjectId;
    //todo add every thin you need
}