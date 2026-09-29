import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class TransactionsService {

    constructor(private prisma: PrismaService) { }

    async GetallTransaccion() {

            const resultado = await this.prisma.transaction.findMany()
            console.log(resultado)
            return resultado
       
    }

}
