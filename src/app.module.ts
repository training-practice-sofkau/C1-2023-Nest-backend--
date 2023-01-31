import { Module } from '@nestjs/common';
import { AccountModule, CustomerModule, DepositModule, SecurityModule, TransferModule } from './data/modules';


@Module({
  imports: [AccountModule, CustomerModule, DepositModule, SecurityModule, TransferModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
