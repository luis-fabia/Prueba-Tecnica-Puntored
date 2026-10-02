import { Body, Controller, Post } from '@nestjs/common';
import {AuthLoginService} from './auth-login.service.js'
import { AuthLoginDto } from './dto/auth.login.dto.js';


@Controller('auth/login')
export class AuthLoginController {

    constructor(private authLoginService: AuthLoginService) { }

    @Post()
    async ValidateUser(@Body() body: AuthLoginDto) {
        const datos = this.authLoginService.ValidationDatosAuth(body)

    }

}
