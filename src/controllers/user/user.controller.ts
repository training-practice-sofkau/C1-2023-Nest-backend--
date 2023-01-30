import { Body, Controller, Get, Post, Delete, ParseUUIDPipe, Param } from '@nestjs/common';
import { CreateCustomerDto } from 'src/dtos';
import { CustomerEntity } from 'src/persistence/entities';
import { CustomerService, SecurityService } from 'src/services';
import { v4 as uuid } from 'uuid';

@Controller('user')
export class UserController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly securityService: SecurityService,
  ) {}

  @Get()
  findAllUsers(): CustomerEntity[] {
    return this.customerService.getAll();
  }

  @Post('security/signUp')
  registerUser(@Body() createCustomerDto: CreateCustomerDto): string {
    let newCustomer = new CustomerEntity();
    newCustomer = {
      ...createCustomerDto,
      id: uuid(),
    };
    return JSON.stringify(this.securityService.signUp(newCustomer));
  }

  @Delete('delete:id')
  deleteUser(@Param('id', ParseUUIDPipe) customerId: string): boolean {
    return this.customerService.unsubscribe(customerId);
  }
}
