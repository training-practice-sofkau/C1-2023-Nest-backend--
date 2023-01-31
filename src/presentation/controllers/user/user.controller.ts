import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from 'src/business/services';
import { CustomerEntity } from 'src/data/persistence/entities';
import { NewCustomerDTO } from 'src/presentation/dtos';

@Controller('user')
export class UserController {
  constructor(private readonly customerService: CustomerService) {}
  //trae todos los usuarios
  @Get()
  findAllUsers(): CustomerEntity[] {
    return this.customerService.findAll();
  }
  // registro de usuario

  @Post()
  registerUser(@Body() customer: NewCustomerDTO): CustomerEntity {
    return this.customerService.newCustomer(customer);
  }
  // obtener la informacion del cliente
  @Post()
  getCustomerInf(
    @Param('id', ParseUUIDPipe) customerId: string,
  ): CustomerEntity {
    return this.customerService.getCustomerInfo(customerId);
  }

  //Darse de baja Cliente
  @Post()
  unsubscribe(@Param('id', ParseUUIDPipe) customerId: string): boolean {
    return this.customerService.unsubscribe(customerId);
  }

  @Put(':Id')
  updateCustome(
    @Param('Id', ParseUUIDPipe) Id: string,
    @Body() custome: NewCustomerDTO,
  ): CustomerEntity {
    return this.customerService.updatedCustomer(Id, custome);
  }
}
