import { Module } from '@nestjs/common';
import { SecurityController } from './presentation/controllers';
import { AccountService, SecurityService } from './business/services';
import { UserController } from './presentation/controllers/user/user.controller';
import { AccountController } from './presentation/controllers/account/account.controller';
import { TransferController } from './presentation/controllers/transfer/transfer.controller';
import { DepositController } from './presentation/controllers/deposit/deposit.controller';
import { DepositService } from './business/services/deposit/deposit.service';
import { TransferService } from './business/services/transfer/transfer.service';
import { CustomerService } from './business/services/customer/customer.service';
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
  DepositRepository,
  DocumentTypeRepository,
  TransferRepository,
} from './data/persistence/repositories';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [
    SecurityController,
    UserController,
    AccountController,
    TransferController,
    DepositController,
  ],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    TransferService,
    SecurityService,
    AccountRepository,
    AccountTypeRepository,
    TransferRepository,
    DepositRepository,
    CustomerRepository,
    DocumentTypeRepository,
    JwtService,
  ],
  exports: [
    AccountService,
    CustomerService,
    DepositService,
    TransferService,
    SecurityService,
    AccountRepository,
    AccountTypeRepository,
    TransferRepository,
    DepositRepository,
    CustomerRepository,
    DocumentTypeRepository,
    JwtService,
  ],
})
export class AppModule {}
