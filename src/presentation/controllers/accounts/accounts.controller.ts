import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateAccountDto } from 'src/business/dtos';
import { AccountService } from 'src/business/services';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountService) {}
  @Get()
  getAllAccounts(): JSON {
    return JSON.parse(JSON.stringify(this.accountService.getAllAccounts()));
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
}
