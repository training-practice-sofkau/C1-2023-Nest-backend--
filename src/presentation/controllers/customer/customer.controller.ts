import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CustomerEntity } from 'src/data/persistence';
import { CustomerService, SecurityService } from 'src/business/services';
import { newCustomerDTO } from 'src/business/dtos';

@Controller("user")
export class CustomerController {
    constructor(private readonly customerService: CustomerService,
        private readonly securityService: SecurityService) { }

    @Get()
    getUsers() {
        return this.customerService.findAllUsers()
    }

    @Get(":id")
    getUser(@Param("id", new ParseUUIDPipe()) id: string): CustomerEntity {
        return this.customerService.getCustomerInfo(id);
    }

    @Get("/allAccounts/:id")
    getAllAccounts(@Param("id", new ParseUUIDPipe()) id: string) {
        return this.customerService.getAllAccounts(id)
    }
    
    @Post()
    registerUser(@Body() customer: newCustomerDTO): CustomerEntity {
        return this.customerService.createCustomer(customer);
    }

    @Put(":id")
    modifyUser(@Param("id", new ParseUUIDPipe()) id: string, @Body() customer: newCustomerDTO): CustomerEntity {
        return this.customerService.updatedCustomer(id, customer)
    }

    @Delete(":id")
    deleteUser(@Param("id", new ParseUUIDPipe()) id: string) {
        return this.customerService.deleteCustomer(id)
    }

    @Post("/findByFullName")
    findByFullName(@Body() name:{name:string}){
        return this.customerService.findByFullName(name.name)
    }
}