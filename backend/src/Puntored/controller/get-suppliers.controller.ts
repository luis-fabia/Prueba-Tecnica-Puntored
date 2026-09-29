import { Controller, Get } from '@nestjs/common';
import {AuthService} from '../service/auth.service.js'
import {GetSupplierService } from '../service/get-supplier.service.js'
 
@Controller('getSuppliers')
export class GetSuppliersController {
    
    constructor( private getsuppliers: GetSupplierService) {}

    @Get()
    async getallProducts() {
        const respuesta = await this.getsuppliers.GetAllProducts()
        return respuesta
    }

}
