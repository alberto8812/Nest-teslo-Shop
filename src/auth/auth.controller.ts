import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto ';
import { AuthGuard } from '@nestjs/passport';


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
    @Req() request:Express.Request //para tipado y tener la informacion del usuario en la request
  ) {
    console.log(request)
    return {
      ok:true,
      message:'hola mundo',
      user:{name:'carlos'}
    }
  }


}
