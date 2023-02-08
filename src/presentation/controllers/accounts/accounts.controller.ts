import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateAccountDto,
  PaginationDto,
  UpdateAccountDto,
} from 'src/business/dtos';
import { AccountService } from 'src/business/services';
import { Auth, GetCustomer } from 'src/common/decorators';
import { PaginationModel } from 'src/data/models';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @Auth()
  getAllAccounts(
    @Body() pagination: PaginationDto,
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.accountService.getAllAccounts(
          customerId,
          <PaginationModel>pagination,
        ),
      ),
    );
  }

  @Get(':id')
  @Auth()
  getAccountById(
    @Param('id', ParseUUIDPipe) accountId: string,
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
  ): JSON {
    return JSON.parse(
      JSON.stringify(this.accountService.getAccountById(customerId, accountId)),
    );
  }

  @Post()
  @Auth()
  createAccount(
    @Body() accountDto: CreateAccountDto,
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
  ): JSON {
    return JSON.parse(
      JSON.stringify(this.accountService.createAccount(customerId, accountDto)),
    );
  }

  @Auth()
  @Delete(':id')
  deleteAccount(
    @Param('id', ParseUUIDPipe) accountId: string,
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
  ): boolean {
    this.accountService.deleteAccount(customerId, accountId);
    return true;
  }

  @Patch(':id')
  changeState(
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): string {
    this.accountService.changeState(
      customerId,
      accountId,
      updateAccountDto.state,
    );
    return 'true';
  }
}
