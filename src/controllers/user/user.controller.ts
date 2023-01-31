import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerEntity } from '../../persistence/entities/customer.entity';
import { CustomerService } from '../../services/customer/customer.service';
import { NewCustomerDTO } from 'src/dtos/customer/new-customer.dto';

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
  @Post()
  getCustomerInf(
    @Param('id', ParseUUIDPipe) customerId: string,
  ): CustomerEntity {
    return this.customerService.getCustomerInfo(customerId);
  }

  @Post()
  unsubscribe(@Param('id', ParseUUIDPipe) customerId: string): boolean {
    return this.customerService.unsubscribe(customerId);
  }
}
