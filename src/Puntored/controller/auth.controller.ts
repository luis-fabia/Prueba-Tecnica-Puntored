import { Body, Controller, Get } from '@nestjs/common';
import {  Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service.js'
import {AuthDto} from '../dto/auth.dth.js'

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post()
    async Autentificacion(@Body()  body: AuthDto) {
        const respuesta = await  this.authService.getToken(body)
        console.log(respuesta)
    
    }
}
