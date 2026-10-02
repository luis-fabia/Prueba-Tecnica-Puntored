import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js'
import * as bcrypt from 'bcrypt';
import { userdto } from './dto/user.dto.js'


@Injectable()
export class UsersService {

    constructor(private primas: PrismaService) { }

    async ConstructoHash( username: string, passworld: string) {

        const passworldHash = await bcrypt.hash(passworld, 10);

        return this.primas.user.create({
            data: {
                username,
                password: passworldHash
            }
        })
    }

    async findByUsername( username: string ) {

        return this.primas.user.findUnique({
            where: {username}
        })
  
  }

}

