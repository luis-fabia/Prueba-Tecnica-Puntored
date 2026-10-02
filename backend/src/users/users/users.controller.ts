import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service.js'
import {userdto } from './dto/user.dto.js'

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post() 
    async  ValidacionDatos(@Body() body: userdto ) {
        return this.usersService.ConstructoHash( body.username, body.password )
    }

    @Post('login')
    async GetUserCreated(@Body() Body: userdto) {
        return this.usersService.findByUsername(Body.username)
    }

}
