import { Module } from '@nestjs/common';
import { AuthController } from './Puntored/controller/auth.controller.js';
import { AuthService } from './Puntored/service/auth.service.js';
import { ConfigModule } from '@nestjs/config'
import { validate } from 'class-validator';
import { GetSupplierService } from './Puntored/service/get-supplier.service.js'
import { GetSuppliersController } from './Puntored/controller/get-suppliers.controller.js'
import { BuyService } from './Puntored/service/buy.service.js'
import { BuyController } from './Puntored/controller/buy.controller.js'
import { PrismaModule } from './prisma/prisma.module.js';
import { TransactionsController } from './Puntored/controller/transactions.controller.js'
import { TransactionsService } from './Puntored/service/transactions.service.js'
import { UsersModule } from './users/users/users.module.js';
import { AuthLoginModule } from './auth-login/auth-login.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    PrismaModule,
    UsersModule,
    AuthLoginModule
  ],
  controllers: [AuthController, GetSuppliersController, BuyController, TransactionsController ], 
  providers: [AuthService, GetSupplierService, BuyService, TransactionsService],
})
export class AppModule {}
