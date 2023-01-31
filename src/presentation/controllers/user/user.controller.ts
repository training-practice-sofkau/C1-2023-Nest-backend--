import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put , } from '@nestjs/common';
import { NewCustomerDTO } from 'src/presentation/dtos/new-customer.dto';
import { CustomerEntity } from 'src/persistence/entities';
import { CustomerService } from 'src/services';


@Controller('user')
export class UserController {

    constructor(private readonly customerService: CustomerService){}

    @Get()
    findAllUser(): CustomerEntity[] {
        return this.customerService.findAll();
    }

    @Post()
    registerUser(@Body() customer: NewCustomerDTO): CustomerEntity {
      return this.customerService.newCustomer(customer);
    }
     
    @Post()
    userInformation(@Param('id' , ParseUUIDPipe) customerId: string): CustomerEntity{
        return this.customerService.getCustomerInfo(customerId);
    }


    @Post()
    unsubcribeUser(@Param('id' , ParseUUIDPipe) customerId: string): boolean {
        return this.customerService.unsubscribe(customerId);
    }

    @Put()
    userUpdate(@Param('Id', ParseUUIDPipe)Id: string,
    @Body()customer: NewCustomerDTO,
    ): CustomerEntity{
    return this.customerService.updatedCustomer(Id, customer);
    }
}







