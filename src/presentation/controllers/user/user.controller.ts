import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerEntity } from '../../../data/persistence/entities/customer.entity';
import { CustomerService } from '../../../business/services/customer/customer.service';
import { CustomerDTO } from '../../../business/dtos';

@Controller('user')
export class UserController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAllUsers(): CustomerEntity[] {
    return this.customerService.findAll();
  }

  @Get(':id')
  findUser(@Param('id') id: string): CustomerEntity {
    return this.customerService.getCustomerInfo(id);
  }

  @Post()
  registerUser(@Body() customer: CustomerDTO): CustomerEntity {
    return this.customerService.newCustomer(customer);
  }

  @Put()
  updateUser(@Body() customer: CustomerDTO): CustomerEntity {
    return this.customerService.newCustomer(customer);
  }

  @Delete()
  deleteUser(@Body() customerId: string): boolean {
    return this.customerService.unsubscribe(customerId);
  }
}
