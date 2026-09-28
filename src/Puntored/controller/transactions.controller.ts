import { Controller, Get } from '@nestjs/common';
import {TransactionsService} from '../service/transactions.service.js'

@Controller('transactions')
export class TransactionsController {

    constructor(private transactionsService: TransactionsService) {}

    @Get()
    async GetallTransaccion() {
        const response = await this.transactionsService.GetallTransaccion()
        return response
    }

}
