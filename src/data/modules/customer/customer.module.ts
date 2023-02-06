import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { AccountRepository, AccountTypeRepository, CustomerRepository } from "src/business/persistence";
import { AccountService, CustomerService, SecurityService } from "src/data/services";
import { CustomerController } from "src/presentation";

@Module({
    controllers: [CustomerController],
    providers: [CustomerRepository, CustomerService, AccountRepository, SecurityService, AccountService, AccountTypeRepository]
})
export class CustomerModule { }