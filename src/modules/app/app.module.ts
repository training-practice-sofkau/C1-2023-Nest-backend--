import { Module } from '@nestjs/common';
import { SecurityController } from 'src/controllers';
import { AccountModule } from '../account/account.module';
import { DepositModule } from '../deposit/deposit.module';
import { TransferModule } from '../transfer/transfer.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, AccountModule, TransferModule, DepositModule],
  controllers: [SecurityController],
  providers: [],
})
export class AppModule { }