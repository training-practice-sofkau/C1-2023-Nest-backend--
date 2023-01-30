import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { SecurityModule } from './modules/security/security.module';
import { TransferModule } from './modules/transfer/transfer.module';


@Module({
  imports: [AccountModule, CustomerModule, DepositModule, SecurityModule, TransferModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
