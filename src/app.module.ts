import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { CustomerController } from './controllers/customer/customer.controller';
import { AccountController } from './controllers/account/account.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { AccountModule } from './modules/account/account.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DepositService } from './services/deposit/deposit.service';
import { TransferService } from './services/transfer/transfer.service';
import { CustomerService } from './services/customer/customer.service';

@Module({
  imports: [AccountModule, TransferModule, DepositModule, CustomerModule],
  controllers: [SecurityController, CustomerController, AccountController, TransferController, DepositController],
  providers: [AccountService, DepositService, TransferService, CustomerService],
})
export class AppModule {}
