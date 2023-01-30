import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewCustomerDTO } from 'src/dtos/new-customer.dto';
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
}