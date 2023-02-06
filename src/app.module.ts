import { Module } from '@nestjs/common';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRespository } from './business/persistence';
import { AccountService, CustomerService, DepositService, SecurityService, TransferService } from './data/services';
import { AccountModule, CustomerModule, DepositModule, SecurityModule, TransferModule } from './data/modules';
import { AccountController, CustomerController, DepositController, SecurityController, TransferController } from './presentation';


@Module({
  imports: [],
  controllers: [AccountController, CustomerController, DepositController, SecurityController, TransferController],
  providers: [AccountService, DepositService, TransferService, CustomerService, SecurityService, DepositRepository, CustomerRepository, TransferRespository, DocumentTypeRepository, AccountTypeRepository, AccountRepository]
})
export class AppModule { }
