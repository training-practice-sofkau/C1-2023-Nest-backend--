import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account/account.controller';
import { UserController } from './controllers/user/user.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { AccountTypeRepository } from './persistence/repositories/account-type.repository';
import { AccountRepository } from './persistence/repositories/account.repository';
import { CustomerRepository } from './persistence/repositories/customer.respository';
import { AccountService } from './services/account/account.service';
import { CustomerService } from './services/customer/customer.service';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [],
  controllers: [UserController, AccountController, DepositController],
  providers: [
    CustomerService,
    CustomerRepository,
    AccountService,
    AccountRepository,
    AccountTypeRepository,
  ],
})
export class AppModule {}
