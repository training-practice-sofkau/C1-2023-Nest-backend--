import { Module } from '@nestjs/common';
import { SecurityController } from './presentation/controllers';
import { AccountService, SecurityService } from './business/services';
import { UsersController } from './presentation/controllers/users/users.controller';
import { AccountsController } from './presentation/controllers/accounts/accounts.controller';
import { TransfersController } from './presentation/controllers/transfers/transfers.controller';
import { DepositsController } from './presentation/controllers/deposits/deposits.controller';
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
    UsersController,
    AccountsController,
    TransfersController,
    DepositsController,
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
