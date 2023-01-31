import { Module } from '@nestjs/common';
import { AccountController } from './presentation/controllers/account/account.controller';
import { TransferController } from './presentation/controllers/transfer/transfer.controller';
import { DepositController } from './presentation/controllers/deposit/deposit.controller';
import { UserController } from './presentation/controllers/user/user.controller';
import { CustomerRepository } from './data/persistence';
import { AccountRepository } from './data/persistence/repositories/account.repository';
import { AccountTypeRepository } from './data/persistence/repositories/account-type.repository';
import { DepositRepository } from './data/persistence/repositories/deposit.repository';
import { TransferRepository } from './data/persistence/repositories/transfer.repository';
import { CustomerService } from './business/services';
import { AccountService } from './business/services/account/account.service';
import { DepositService } from './business/services/deposit/deposit.service';
import { TransferService } from './business/services/transfer/transfer.service';

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
