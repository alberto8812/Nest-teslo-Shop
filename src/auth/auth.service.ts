import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto ';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt.payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('user'); //es un sima de loger que ya nos ofrece nest
  constructor(
    @InjectModel(User.name)
    private readonly userModel:Model<User>,
    private readonly jwtService :JwtService
  ){

  }
  async create(createAuthDto: CreateUserDto) {
    try {
     const {password,...userData}=createAuthDto
     const user = await this.userModel.create({password:bcrypt.hashSync(password,10),...userData});
     const {password:PassworrdResp,...userResponsed}=user.toJSON();
     return{
      ...userResponsed,
      token:this.GetJwtToken({id:user._id,email:user.email})
     };
    } catch (error) {
       this.handleDBEceptions(error)
    }
  }


  async login(loginUsreDto:LoginUserDto){

    const {password,email}=loginUsreDto;

    const user= await this.userModel.findOne({email}).select('email password id').exec()

    if(!user){
      throw  new UnauthorizedException('credential are not valid (email)');
    }
    if(!bcrypt.compareSync(password,user.password)){
      throw  new UnauthorizedException('credential are not valid (password)');
    }
    return{
       ...user.toJSON(),
       token:this.GetJwtToken({id:user._id,email:user.email})
      };
    //todo retornar jwt
  }

  
    private GetJwtToken(payload:JwtPayload){
      const token= this.jwtService.sign(payload);//codigo es sincrono
      return token; 
     }

  private handleDBEceptions(error: any):never {
    console.log(error)
    if (error.code=== 11000) {
      throw new BadRequestException(error.errorResponse.errmsg);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server log',
    );
  }
}
