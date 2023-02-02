import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user/user.controller';
import { CustomerService } from './business/service/customer/customer.service';
import { CustomerRepository } from './data/persistence/repository/customer.repository';
import {
  AccountController,
  DepositController,
  SecurityController,
  TransferController,
} from './presentation/controllers';
import {
  AccountService,
  DepositService,
  TransferService,
  SecurityService,
} from './business';
import {
  AccountRepository,
  AccountTypeRepository,
  DepositRepository,
  DocumentTypeRepository,
  TransferRepository,
} from './data/persistence/repository';

@Module({
  imports: [],
  controllers: [
    UserController,
    AccountController,
    DepositController,
    TransferController,
    SecurityController,
  ],
  providers: [
    CustomerService,
    CustomerRepository,
    AccountService,
    AccountRepository,
    AccountTypeRepository,
    DepositRepository,
    DepositService,
    DocumentTypeRepository,
    TransferRepository,
    TransferService,
    SecurityService,
  ],
})
export class AppModule {}
