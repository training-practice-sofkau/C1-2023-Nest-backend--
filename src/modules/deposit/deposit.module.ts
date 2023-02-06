import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { DepositController } from "src/controllers/deposit/deposit.controller";
import { AccountTypeRepository } from "src/persistence/repositories/account-type.repository";
import { AccountRepository } from "src/persistence/repositories/account.repository";
import { DepositRepository } from "src/persistence/repositories/deposit.repository";
import { AccountService, DepositService } from "src/services";

@Module({
    controllers:[DepositController],
    providers:[DepositService,AccountService,DepositRepository,AccountRepository, AccountTypeRepository]
})
export class DepositModule{}