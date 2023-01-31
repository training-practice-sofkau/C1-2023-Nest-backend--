import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { AccountController } from "src/controllers/account/account.controller";
import { AccountTypeRepository } from "src/persistence/repositories/account-type.repository";
import { AccountRepository } from "src/persistence/repositories/account.repository";
import { AccountService } from "src/services";

@Module({
    controllers:[AccountController],
    providers:[AccountService,AccountRepository,AccountTypeRepository]
})
export class AccountModule{}