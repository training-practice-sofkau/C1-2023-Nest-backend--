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
import { PaginationModel } from 'src/data';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAllAccounts(@Body() pagination: PaginationDto): JSON {
    return JSON.parse(
      JSON.stringify(
        this.accountService.getAllAccounts(<PaginationModel>pagination),
      ),
    );
  }

  @Get(':id')
  getAccountByCustomerId(@Param('id', ParseUUIDPipe) customerId: string): JSON {
    return JSON.parse(
      JSON.stringify(this.accountService.getAccountsByCustomer(customerId)),
    );
  }

  @Post()
  createAccount(@Body() accountDto: CreateAccountDto): JSON {
    return JSON.parse(
      JSON.stringify(this.accountService.createAccount(accountDto)),
    );
  }

  @Delete(':id')
  deleteAccount(@Param('id', ParseUUIDPipe) accountId: string): boolean {
    this.accountService.deleteAccount(accountId);
    return true;
  }

  @Patch(':id')
  changeState(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): string {
    this.accountService.changeState(accountId, updateAccountDto.state);
    return 'true';
  }
}
