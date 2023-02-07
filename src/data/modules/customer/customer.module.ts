import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { AccountRepository, AccountTypeRepository, CustomerRepository } from "src/data/persistence";
import { AccountService, CustomerService, SecurityService } from "src/business/services";
import { CustomerController } from "src/presentation/controllers";

@Module({
    controllers: [CustomerController],
    providers: [CustomerRepository, CustomerService, AccountRepository, SecurityService, AccountService, AccountTypeRepository]
})
export class CustomerModule { }