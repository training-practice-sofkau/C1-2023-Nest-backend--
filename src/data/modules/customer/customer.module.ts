import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { CustomerController } from "src/controllers/customer/customer.controller";
import { AccountTypeRepository } from "src/persistence/repositories/account-type.repository";
import { AccountRepository } from "src/persistence/repositories/account.repository";
import { CustomerRepository } from "src/persistence/repositories/customer.repository";
import { AccountService, CustomerService, SecurityService } from "src/services";
import { SecurityModule } from "../security/security.module";

@Module({
    controllers: [CustomerController],
    providers: [CustomerRepository, CustomerService, AccountRepository, SecurityService, AccountService, AccountTypeRepository]
})
export class CustomerModule { }