import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/customer/customer.controller";
import { CustomerRepository } from "src/persistence/repositories/customer.repository";
import { CustomerService } from "src/services/customer/customer.service";

@Module({
    imports:[],
    controllers:[UserController],
    providers:[CustomerService]
})

export class CustomerModule{}