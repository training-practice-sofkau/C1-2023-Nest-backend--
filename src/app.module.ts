import { Module } from '@nestjs/common';
import { SecurityController } from './presentation/controllers';
import { AccountService, SecurityService } from './services';
import { UserController } from './presentation/controllers/user/user.controller';
import { AccountController } from './presentation/controllers/account/account.controller';
import { TransferController } from './presentation/controllers/transfer/transfer.controller';
import { DepositController } from './presentation/controllers/deposit/deposit.controller';
import { DepositService } from './services/deposit/deposit.service';
import { TransferService } from './services/transfer/transfer.service';
import { CustomerService } from './services/customer/customer.service';
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
  DepositRepository,
  DocumentTypeRepository,
  TransferRepository,
} from './data/persistence/repositories';

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
  ],
})
export class AppModule {}
