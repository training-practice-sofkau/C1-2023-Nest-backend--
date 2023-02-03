import { AccountRepository, CustomerRepository } from './data/persistence/repositories';
import { DepositRepository } from './data/persistence/repositories/deposit.repository';
import { DepositService } from './business/services/deposit/deposit.service';
import { TransferReoisitory } from './data/persistence/repositories';
import { Module } from '@nestjs/common';
import { SecurityController } from './presentation/controllers';
import { AccountService } from './business/services/account/account.service';
import { UserController } from './presentation/controllers/user/user.controller';
import { CustomerService } from './business/services/customer';
import { AccountController } from './presentation/controllers/account/account.controller';
import { TransferController } from './presentation/controllers/transfer/transfer.controller';
import { DepositController } from './presentation/controllers/deposit/deposit.controller';
import { TransferService } from './business/services/transfer/transfer.service';

@Module({
  imports: [],
  controllers: [UserController, AccountController, TransferController, DepositController],
  providers: [AccountService, AccountRepository, CustomerService, CustomerRepository, TransferService, TransferReoisitory, DepositService, DepositRepository],
})
export class AppModule { }
