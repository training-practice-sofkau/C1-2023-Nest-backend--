
import { Module } from "@nestjs/common";
import { CustomerRepository } from "./persistence/repositories";
import { AccountController } from "./presentation/controllers/account/account.controller";
import { DepositController } from "./presentation/controllers/deposit/deposit.controller";
import { TransferController } from "./presentation/controllers/transfer/transfer.controller";
import { UserController } from "./presentation/controllers/user/user.controller";
import { CustomerService } from "./services";

@Module({
  imports: [],
  controllers: [UserController, DepositController, AccountController, TransferController],
  providers: [CustomerService, CustomerRepository],
})
export class AppModule {}
