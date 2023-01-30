import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateAccountDto } from 'src/dtos';
import { AccountEntity } from 'src/persistence/entities';
import { AccountService } from 'src/services';
import { v4 as uuid } from 'uuid';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Get()
  getAllAccounts(): string {
    console.log(this.accountService.getAllAccounts);
    return JSON.stringify(this.accountService.getAllAccounts);
  }

  @Get(':id')
  getAccountByCustomerId(
    @Param('id', ParseUUIDPipe) customerId: string,
  ): string {
    return JSON.stringify(
      this.accountService.getAccountsByCustomer(customerId),
    );
  }

  @Post()
  createAccount(@Body() accountDto: CreateAccountDto): string {
    let newAccount = new AccountEntity();
    newAccount = {
      ...accountDto,
      id: uuid(),
    };
    newAccount.accountType = {
      ...accountDto.accountType,
    };
    newAccount.customer = {
      ...accountDto.customer,
    };
    //return JSON.stringify(newAccount);
    return JSON.stringify(this.accountService.createAccount(newAccount));
  }
}
