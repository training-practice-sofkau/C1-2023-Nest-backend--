import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { AccountController } from "src/presentation";
import { AccountTypeRepository } from "src/business/persistence";
import { AccountRepository } from "src/business/persistence";
import { AccountService } from "src/data/services";

@Module({
    controllers:[AccountController],
    providers:[AccountService,AccountRepository,AccountTypeRepository]
})
export class AccountModule{}