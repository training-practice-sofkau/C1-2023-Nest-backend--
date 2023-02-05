import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountModel } from 'src/data/models';
import { AccountTypeEntity } from 'src/data/persistence/entities/account-type.entity';
import { AccountEntity } from 'src/data/persistence/entities/account.entity';
import { AccountService } from 'src/business/services/account/account.service';


@Controller('account')
export class AccountController {
    constructor (private readonly accountService: AccountService){}
    @Post()
    createAccount(@Body() account: AccountModel): AccountEntity {
      return this.accountService.createAccount(account);
    }
  
    @Get('balance/:id')
    getBalance(@Param('id') accountId: string): number {
      return this.accountService.getBalance(accountId);
    }
  
    @Put(':id')
    addBalance(@Param('id') accountId: string, @Body('amount') amount: number): string {
       this.accountService.addBalance(accountId, amount);
       return "operacion exitosa"
    }
  
    @Put(':id')
    removeBalance(@Param('id') accountId: string, @Body('amount') amount: number): void {
      return this.accountService.removeBalance(accountId, amount);
    }
  
    @Get('state/:id')
    getState(@Param('id') accountId: string): boolean {
      return this.accountService.getState(accountId);
    }
    @Get('type/:accountId')
    getAccount(@Param('accountId') accountId: string): AccountTypeEntity {
    return this.accountService.getAccount(accountId);
  }
  
    @Put('changestate/:id')
    changeState(@Param('id') accountId: string, @Body('state') state: boolean): void {
      return this.accountService.changeState(accountId, state);
    }
  
    @Get(':id/type')
    getAccountType(@Param('id') accountId: string): AccountTypeEntity {
      return this.accountService.getAccountType(accountId);
    }
}
