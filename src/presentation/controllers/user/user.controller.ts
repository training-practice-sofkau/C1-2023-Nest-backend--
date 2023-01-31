import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NewCustomerDTO } from 'src/presentation/dtos/new-customer.dto';
import { CustomerEntity } from 'src/data/persistence';
import { CustomerService } from 'src/business/services';

@Controller('user')
export class UserController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAllCustomers(): CustomerEntity[] {
    console.log('entra en get');
    return this.customerService.findAll();
  }

  @Post()
  registerCustomer(@Body() customer: NewCustomerDTO): CustomerEntity {
    return this.customerService.newCustomer(customer);
  }

  @Get()
  getCustomer(@Param('id') id: string): CustomerEntity {
    console.log('entra en get');
    return this.customerService.getCustomerInfo(id);
  }

  @Put('/:id')
  UpdateCustomer(
    @Body() account: NewCustomerDTO,
    @Param('id') id: string,
  ): CustomerEntity {
    console.log('entra en put');
    return this.customerService.updatedCustomer(id, account);
  }

  @Delete()
  deleteCustomer(@Param('id') id: string): void {
    this.customerService.unsubscribe(id);
  }
}
