import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountModel } from 'src/models';
import { AccountTypeEntity } from 'src/persistence/entities/account-type.entity';
import { AccountEntity } from 'src/persistence/entities/account.entity';
import { AccountService } from 'src/services/account/account.service';


@Controller('account')
export class AccountController {
    constructor (private readonly accountService: AccountService){}
    @Post()
    createAccount(@Body() account: AccountModel): AccountEntity {
      return this.accountService.createAccount(account);
    }
  
    @Get(':id')
    getBalance(@Param('id') accountId: string): number {
      return this.accountService.getBalance(accountId);
    }
  
    @Put(':id')
    addBalance(@Param('id') accountId: string, @Body('amount') amount: number): void {
      return this.accountService.addBalance(accountId, amount);
    }
  
    @Delete(':id')
    removeBalance(@Param('id') accountId: string, @Body('amount') amount: number): void {
      return this.accountService.removeBalance(accountId, amount);
    }
  
    @Get(':id/state')
    getState(@Param('id') accountId: string): boolean {
      return this.accountService.getState(accountId);
    }
  
    @Put(':id/state')
    changeState(@Param('id') accountId: string, @Body('state') state: boolean): void {
      return this.accountService.changeState(accountId, state);
    }
  
    @Get(':id/type')
    getAccountType(@Param('id') accountId: string): AccountTypeEntity {
      return this.accountService.getAccountType(accountId);
    }
}
