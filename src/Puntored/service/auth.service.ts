import { HttpException, Injectable, Post, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { AuthDto } from '../dto/auth.dth.js'

@Injectable()
export class AuthService {


    constructor(private configService: ConfigService) { }


    token: string

    async getToken(body: AuthDto) {

        const PUNTORED_AUTH_URL = this.configService.get('PUNTORED_AUTH_URL')
        const PUNTORED_HEADER = this.configService.get('PUNTORED_HEADER')
        const PUNTORED_API_KEY = this.configService.get('PUNTORED_API_KEY')

        try {

            const response = await fetch(`${PUNTORED_AUTH_URL}/auth`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        [PUNTORED_HEADER]: PUNTORED_API_KEY,
                    },
                    body: JSON.stringify(body),
                },
            );


            const data = await response.json();

            if (!response.ok) {
                throw new HttpException(
                    data,
                    response.status
                )

            }

            this.token = data.token

        } catch (error) {

            if (error instanceof HttpException) {
                throw error
            }

            throw new ServiceUnavailableException(
                "No Fue posible la Autentificacion"
            )
        }
    }
}
