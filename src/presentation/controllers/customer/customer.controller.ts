import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CustomerService } from 'src/business/services';
import { CustomerEntity } from 'src/data/persistence';
import { NewCustomerDTO } from 'src/presentation/dtos/new-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAllCustomers(): CustomerEntity[] {
    console.log('entra en get');
    return this.customerService.findAll();
  }

  @Get('/:id')
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
