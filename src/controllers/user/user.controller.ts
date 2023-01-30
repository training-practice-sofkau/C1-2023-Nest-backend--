import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerEntity } from '../../persistence/entities/customer.entity';
import { CustomerService } from '../../services/customer/customer.service';
import { NewCustomerDTO } from '../../dtos/new-customer.dto';

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

// nota de entrega
