import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import {UsersService} from '../users/users/users.service.js'
import {AuthLoginDto}  from './dto/auth.login.dto.js'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthLoginService {


    constructor(
        private usersService :UsersService, 
        private jwtService: JwtService, 
        private configService: ConfigService) {}

    async ValidationDatosAuth(body: AuthLoginDto) {
        const { username } = body
        const JWTSECRECT = this.configService.get('JWT_SECRET')

        const datos = await this.usersService.findByUsername(username)

        if(!datos) throw new UnauthorizedException()

        const existencia = await bcrypt.compare(body.password, datos.password)

        if (!existencia) throw new UnauthorizedException()

        const payload = {
            sub: datos.id,
            username: datos.username
        }

        return { accesToken: this.jwtService.sign(payload) }

    }


}
