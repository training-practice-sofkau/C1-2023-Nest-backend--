import { Body, Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { CreateAccountDto } from 'src/dtos/account/create-account.dto';
import { AccountEntity } from 'src/persistence/entities';
import { AccountService } from 'src/services';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Get()
  getAllAccounts(): string {
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
    const newAccount = new AccountEntity();
    const accountType = this.accountService.getAccountType(
      accountDto.accountTypeId,
    );

    return JSON.stringify(this.accountService.createAccount(newAccount));
  }
}
