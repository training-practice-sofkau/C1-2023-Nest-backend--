// Libraries
import { Module } from '@nestjs/common';

// Repositories
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
  DepositRepository,
  DocumentTypeRepository,
  TransferRepository,
} from './persistence';

// Services
import {
  AccountService,
  CustomerService,
  DepositService,
  SecurityService,
  TransferService,
} from './services';

// Controllers
import {
  AccountsController,
  CustomersController,
  DepositsController,
  SecurityController,
  TransfersController,
} from './controllers';

@Module({
  imports: [],
  controllers: [
    AccountsController,
    CustomersController,
    DepositsController,
    SecurityController,
    TransfersController,
  ],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService,
    AccountRepository,
    AccountTypeRepository,
    CustomerRepository,
    DepositRepository,
    DocumentTypeRepository,
    TransferRepository,
  ],
})
export class AppModule {}
