import {
  Body,
  Controller,
  Get,
  Delete,
  ParseUUIDPipe,
  Param,
  Put,
  Patch,
} from '@nestjs/common';
import { UpdateCustomerDto } from 'src/business/dtos';
import { CustomerService } from 'src/business/services';

@Controller('users')
export class UsersController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAllUsers(): JSON {
    return JSON.parse(JSON.stringify(this.customerService.getAll()));
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) customerId: string): boolean {
    return this.customerService.unsubscribe(customerId);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) customerId: string,
    @Body() updateSecurityDto: UpdateCustomerDto,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.customerService.updateCustomer(customerId, updateSecurityDto),
      ),
    );
  }

  @Patch(':id')
  changeState(@Param('id', ParseUUIDPipe) customerId: string): boolean {
    return this.customerService.changeState(customerId);
  }
}
