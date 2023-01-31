import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { SecurityController } from "src/controllers";
import { AccountTypeRepository } from "src/persistence/repositories/account-type.repository";
import { AccountRepository } from "src/persistence/repositories/account.repository";
import { CustomerRepository } from "src/persistence/repositories/customer.repository";
import { AccountService, CustomerService, SecurityService } from "src/services";

@Module({
    controllers: [SecurityController],
    providers: [SecurityService, AccountService, CustomerRepository, AccountRepository, AccountTypeRepository]
})
export class SecurityModule { }