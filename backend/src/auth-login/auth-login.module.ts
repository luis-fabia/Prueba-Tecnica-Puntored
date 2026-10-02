import { Module } from '@nestjs/common';
import { AuthLoginController } from './auth-login.controller.js';
import { AuthLoginService } from './auth-login.service.js';
import { UsersModule } from '../users/users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ UsersModule,

  JwtModule.registerAsync({
    inject: [ConfigService],

    useFactory: (configService) => ({
      secret: configService.get('JWT_SECRET')
    })
  })
],
  controllers: [AuthLoginController],
  providers: [AuthLoginService]
})
export class AuthLoginModule {}
