import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account/account.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { AccountTypeRepository } from './persistence/repositories/account-type.repository';
import { AccountRepository } from './persistence/repositories/account.repository';
import { CustomerRepository } from './persistence/repositories/customer.respository';
import { AccountService } from './services/account/account.service';
import { CustomerService } from './services/customer/customer.service';
import { UserController } from './controllers/user/user.controller';
import { DepositService } from './services/deposit/deposit.service';
import { DepositRepository } from './persistence/repositories/deposit.repository';
import { TransferService } from './services/transfer/transfer.service';
import { TransferRepository } from './persistence/repositories/transfer.repository';

@Module({
  imports: [],
  controllers: [
    UserController,
    AccountController,
    DepositController,
    TransferController,
  ],
  providers: [
    CustomerService,
    CustomerRepository,
    AccountService,
    AccountRepository,
    AccountTypeRepository,
    DepositService,
    DepositRepository,
    TransferService,
    TransferRepository,
  ],
})
export class AppModule {}
