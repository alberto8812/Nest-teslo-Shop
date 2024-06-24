import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret:process.env.JWT_SECRE,// defenimos la variable entorno
    //   signOptions:{
    //     expiresIn:'1h' //expiracion del token
    //   }
    // })
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configServeice:ConfigService) => {
        return {
          secret:configServeice.get('JWT_SECRET'), // defenimos la variable entorno
          signOptions: {
            expiresIn: '2h', //expiracion del token
          },
        };
      }, //clase que yo voy a llamar cuando se intenta registrar de manera asyncrona al modulo
    }),
  ],
  exports: [AuthModule,JwtStrategy,PassportModule,JwtModule],
})
export class AuthModule {}
