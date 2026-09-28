import { Body, Controller, Post } from '@nestjs/common';
import {Buydto} from '../controller/../dto/buy.dto.js'
import {BuyService} from '../service/buy.service.js'


@Controller('buy')
export class BuyController {
    
    constructor(private buyservice: BuyService) {}

    @Post() 
    async Buy(@Body() body: Buydto) {
        const compra = await  this.buyservice.BuyRecharge(body)
        return compra
    }

}
