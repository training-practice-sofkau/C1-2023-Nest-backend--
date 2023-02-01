import { Patch } from '@nestjs/common';
import { Put } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';
import { CreateCustomerDto, UpdateSecurityDto } from 'src/business';
import { CustomerService, SecurityService } from 'src/business/services';

@Controller('user')
export class UserController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly securityService: SecurityService,
  ) {}

  @Get()
  findAllUsers(): JSON {
    return JSON.parse(JSON.stringify(this.customerService.getAll()));
  }

  @Post('security/signup')
  registerUser(@Body() createCustomerDto: CreateCustomerDto): JSON {
    return JSON.parse(this.securityService.signUp(createCustomerDto));
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) customerId: string): boolean {
    return this.customerService.unsubscribe(customerId);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) customerId: string,
    @Body() updateSecurityDto: UpdateSecurityDto,
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
