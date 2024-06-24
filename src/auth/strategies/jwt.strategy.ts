import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interface/jwt.payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class JwtStrategy  extends PassportStrategy(Strategy){
    constructor(
    @InjectModel(User.name)
    private readonly UserModel:Model<User>,
    configService:ConfigService,
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//POSICION QUE VAMOS A ENVIAR EL JSON WEB TOKEN
        })
    }
    async validate(payload:JwtPayload):Promise<User>{// ojo espara que el metodo se llame validate error generado
        const {email,id}=payload;
        const user = await this.UserModel.findOne({_id:id});
        if(!user){
            throw new UnauthorizedException('Token not valid');
        }
        if(!user.isActive){
            throw new UnauthorizedException('Usuario no activo');
        }
        return user;// se envia en la request
    }
    
}