import { NewCustomerDTO } from 'src/dtos/new-customer.dto';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common'
import { CustomerEntity } from 'src/persistence/entities';
import { CustomerService } from 'src/services/customer';

@Controller('user')
export class UserController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAllUsers(): CustomerEntity[] {
    return this.customerService.findAll();
  }

  @Post()
  registerUser(@Body() customer: NewCustomerDTO): CustomerEntity {
    return this.customerService.newCustomer(customer);
  }
   
   @Get(':id')
   getCustomerInf(@Param('id') customerId: string): string {
    //  return this.customerService.getCustomerInfo(customerId);
      return "hola"
   }
 
   //Desactivar cuenta
   @Post(':id')
   unsubscribe(@Param('id', ParseUUIDPipe) customerId: string): boolean {
     return this.customerService.unsubscribe(customerId);
   }
 
   //actualizar usuario
 
   @Put(':Id')
   updateCustome(
     @Param('Id', ParseUUIDPipe) Id: string,
     @Body() custome: NewCustomerDTO,
   ): CustomerEntity {
     return this.customerService.updatedCustomer(Id, custome);
   }
}