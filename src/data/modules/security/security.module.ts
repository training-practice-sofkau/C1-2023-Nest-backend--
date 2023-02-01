import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { AccountRepository, AccountTypeRepository, CustomerRepository } from "src/data/persistence";
import { AccountService, SecurityService } from "src/business/services";
import { SecurityController } from "src/presentation";

@Module({
    controllers: [SecurityController],
    providers: [SecurityService, AccountService, CustomerRepository, AccountRepository, AccountTypeRepository]
})
export class SecurityModule { }