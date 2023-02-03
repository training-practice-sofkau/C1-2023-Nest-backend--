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
import { CustomerUpdateDTO } from 'src/business/dtos/update-customer.dto';

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

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() customer: CustomerUpdateDTO,
  ): CustomerEntity {
    return this.customerService.updatedCustomer(id, customer);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): boolean {
    return this.customerService.deleteCustomer(id);
  }

  @Put('unsuscribe/:id')
  unsuscribeUser(@Param('id') id: string): boolean {
    return this.customerService.unsuscribe(id);
  }
}
