import { Module } from '@nestjs/common';
import { SecurityController } from '../../controllers';
import { AccountService } from '../../services';
import { CustomerController } from '../../controllers/customer/customer.controller';
import { AccountController } from '../../controllers/account/account.controller';
import { TransferController } from '../../controllers/transfer/transfer.controller';
import { DepositController } from '../../controllers/deposit/deposit.controller';
import { AccountModule } from '../account/account.module';
import { TransferModule } from '../transfer/transfer.module';
import { DepositModule } from '../deposit/deposit.module';
import { CustomerModule } from '../customer/customer.module';
import { DepositService } from '../../services/deposit/deposit.service';
import { TransferService } from '../../services/transfer/transfer.service';
import { CustomerService } from '../../services/customer/customer.service';
import { AppService } from '../../services/app/app.service';

@Module({
  imports: [AccountModule, TransferModule, DepositModule, CustomerModule],
  controllers: [
    SecurityController,
    CustomerController,
    AccountController,
    TransferController,
    DepositController,
  ],
  providers: [
    AccountService,
    DepositService,
    TransferService,
    CustomerService,
    AppService,
  ],
  exports: [
    AccountService,
    DepositService,
    TransferService,
    CustomerService,
    AppService,
  ],
})
export class AppModule {}
