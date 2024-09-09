import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto ';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interface';
import { Auth } from './decorators/auth.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loaginUserDto: LoginUserDto) {
    return this.authService.login(loaginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())//ingresa solo con el token
  testinPrivareRute(
   @GetUser() user:User
  ) {
    //console.log(request)
    return {
      ok:true,
      message:'hola mundo',
      user:{name:'carlos'}
    }
  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUser,ValidRoles.user)
  @UseGuards(AuthGuard(),UserRoleGuard)//ingresa solo con el token
  privateRoute2(
    @GetUser() user:User
  ){
    return  {
      ok:true,
      user
    }
  }

  
  @Get('private3')
  @Auth(ValidRoles.admin,ValidRoles.user)
  privateRoute3(
    @GetUser() user:User
  ){
    return  {
      ok:true,
      user
    }
  }



}
