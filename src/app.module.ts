import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services/account/account.service';
import { UserController } from './controllers/user/user.controller';
import { AccountRepository, CustomerRepository } from './persistence/repositories';
import { CustomerService } from './services/customer';
import { AccountController } from './controllers/account/account.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';

@Module({
  imports: [],
  controllers: [ UserController, AccountController, TransferController, DepositController],
  providers: [AccountService, AccountRepository, CustomerService,CustomerRepository],
})
export class AppModule {}
