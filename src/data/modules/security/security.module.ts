import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { AccountRepository, AccountTypeRepository, CustomerRepository } from "src/business/persistence";
import { AccountService, SecurityService } from "src/data/services";
import { SecurityController } from "src/presentation";

@Module({
    controllers: [SecurityController],
    providers: [SecurityService, AccountService, CustomerRepository, AccountRepository, AccountTypeRepository]
})
export class SecurityModule { }