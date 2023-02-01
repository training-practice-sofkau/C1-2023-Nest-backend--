import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { AccountRepository, AccountTypeRepository, DepositRepository } from "src/data/persistence";
import { AccountService, DepositService } from "src/business/services";
import { DepositController } from "src/presentation";

@Module({
    controllers:[DepositController],
    providers:[DepositService,AccountService,DepositRepository,AccountRepository, AccountTypeRepository]
})
export class DepositModule{}