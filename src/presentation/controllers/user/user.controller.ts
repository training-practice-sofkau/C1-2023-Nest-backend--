import { AccountController } from './../account/account.controller';
import { AccountRepository } from 'src/data/persistence/repositories';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { NewCustomerDTO } from 'src/business/dtos/new-customer.dto';
import { CustomerEntity } from 'src/data/persistence/entities';
import { CustomerService } from 'src/business/services/customer';
import { AccountService } from 'src/business/services/account/account.service';

@Controller('user')
export class UserController {
  constructor(private readonly customerService: CustomerService, private readonly accountService: AccountService ) {}

  @Get()
  findAllUsers(): CustomerEntity[] {
    return this.customerService.findAll();
  }

  @Post()
  registerUser(@Body() customer: NewCustomerDTO): CustomerEntity {
    return this.customerService.newCustomer(customer);
  }
   
   @Get(':id')
   getCustomerInf(@Param('id') customerId: string):  CustomerEntity {
     return this.customerService.getCustomerInfo(customerId);
     
   }

 
   //Desactivar cuenta
   @Post('desactivar/:id')
   unsubscribe(@Param('id', ParseUUIDPipe) customerId: string): boolean {
     return this.customerService.unsubscribe(customerId);
   }
 
   //actualizar usuario
 
   @Put(':Id')
   updateCustome(
     @Param('Id', ParseUUIDPipe) Id: string,
     @Body() custome: NewCustomerDTO,
   ): CustomerEntity {
     return this.customerService.updateCustomer(Id, custome);
   }
}