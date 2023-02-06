import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { CustomerRepository } from './persistence/repositories';
import { CustomerService } from './services';
import { DepositController } from './controllers/deposit/deposit.controller';
import { AccountController } from './controllers/account/account.controller';
import { TransferController } from './controllers/transfer/transfer.controller';

@Module({
  imports: [],
  controllers: [UserController, DepositController, AccountController, TransferController],
  providers: [CustomerService, CustomerRepository],
})
export class AppModule {}
