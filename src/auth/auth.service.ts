import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';


@Injectable()
export class AuthService {
  private readonly logger = new Logger('user'); //es un sima de loger que ya nos ofrece nest
  constructor(
    @InjectModel(User.name)
    private readonly userModel:Model<User>
  ){

  }
  async create(createAuthDto: CreateUserDto) {
    try {

     const user = await this.userModel.create(createAuthDto);
    return user;  
    } catch (error) {
       this.handleDBEceptions(error)
    }
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
