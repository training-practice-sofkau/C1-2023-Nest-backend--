import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { AccountController } from "src/presentation/controllers";
import { AccountRepository, AccountTypeRepository } from "src/data/persistence";
import { AccountService } from "src/business/services";

@Module({
    controllers: [AccountController],
    providers: [AccountService, AccountRepository, AccountTypeRepository]
})
export class AccountModule { }