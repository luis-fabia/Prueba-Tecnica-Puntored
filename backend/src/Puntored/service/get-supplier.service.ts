import { HttpException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../service/auth.service.js'

@Injectable()
export class GetSupplierService {

    constructor(private configService: ConfigService, private authService: AuthService) { }


    async GetAllProducts() {


        const token =  await this.authService.getValidToken()

        const PUNTORED_AUTH_URL = this.configService.get('PUNTORED_AUTH_URL')

        try {

            const peticion = await fetch(`${PUNTORED_AUTH_URL}/getSuppliers`, {
                method: 'GET',
                headers: { 'authorization': `${token}` }
            })

            const datos = await peticion.json()

            if (!peticion.ok) {
                throw new HttpException(
                    datos,
                    peticion.status
                )
            }

            return datos

        }
        catch (error) {
            if (error instanceof HttpException) {
                throw error
            }

            throw new ServiceUnavailableException(
                "No fue Posible la obtencion de los productos "
            );

        }
    }

}

