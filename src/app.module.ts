import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService, SecurityService } from './services';
import { UserController } from './controllers/user/user.controller';
import { AccountController } from './controllers/account/account.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { DepositService } from './services/deposit/deposit.service';
import { TransferService } from './services/transfer/transfer.service';
import { CustomerService } from './services/customer/customer.service';
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
  DepositRepository,
  TransferRepository,
} from './persistence/repositories';

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
  ],
})
export class AppModule {}
