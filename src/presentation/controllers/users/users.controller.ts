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
import { PaginationDto, UpdateCustomerDto } from 'src/business/dtos';
import { CustomerService } from 'src/business/services';
import { PaginationModel } from 'src/data/models';

@Controller('users')
export class UsersController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAllUsers(@Body() paginationDto: PaginationDto): JSON {
    return JSON.parse(
      JSON.stringify(
        this.customerService.getAll(<PaginationModel>paginationDto),
      ),
    );
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
