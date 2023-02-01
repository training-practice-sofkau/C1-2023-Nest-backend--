import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerEntity } from '../../../data/persistence/entities/customer.entity';
import { CustomerService } from '../../../business/service/customer/customer.service';
import { NewCustomerDTO } from '../../../business/dtos/new-customer.dto';

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
  @Get(':id')
  getCustomerInf(@Param('id') customerId: string): CustomerEntity {
    return this.customerService.getCustomerInfo(customerId);
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
