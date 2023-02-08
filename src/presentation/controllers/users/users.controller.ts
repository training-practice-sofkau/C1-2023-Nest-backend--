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
import { Auth, GetCustomer } from 'src/common/decorators';
import { PaginationModel } from 'src/data/models';

@Controller('users')
export class UsersController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @Auth()
  findAllUsers(@Body() paginationDto: PaginationDto): JSON {
    return JSON.parse(
      JSON.stringify(
        this.customerService.getAll(<PaginationModel>paginationDto),
      ),
    );
  }

  @Delete(':id')
  @Auth()
  deleteUser(
    @Param('id', ParseUUIDPipe) customerId: string,
    @GetCustomer('id', ParseUUIDPipe) currentCustomerId: string,
  ): boolean {
    return this.customerService.unsubscribe(currentCustomerId, customerId);
  }

  @Put(':id')
  @Auth()
  updateUser(
    @Param('id', ParseUUIDPipe) customerId: string,
    @GetCustomer('id', ParseUUIDPipe) currentCustomerId: string,
    @Body() updateSecurityDto: UpdateCustomerDto,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.customerService.updateCustomer(
          currentCustomerId,
          customerId,
          updateSecurityDto,
        ),
      ),
    );
  }

  @Patch(':id')
  @Auth()
  changeState(@Param('id', ParseUUIDPipe) customerId: string): boolean {
    return this.customerService.changeState(customerId);
  }
}
