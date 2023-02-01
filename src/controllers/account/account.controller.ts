import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { NewAccountDto } from 'src/dtos';
import { AccountTypeEntity } from 'src/persistence/entities';
import { AccountService } from 'src/services';
import { AccountEntity } from '../../persistence/entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  //crear cuenta
  @Post('new')
  createAccoun(@Body() account: NewAccountDto): AccountEntity {
    return this.accountService.createAccount(account);
  }

  @Get('balance/:accountId')
  getBalanc(@Param('accountId', ParseUUIDPipe) accountId: string): number {
    return this.accountService.getBalance(accountId);
  }

  @Put('add/:accountId')
  addBalanc(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('amount') amount: number,
  ): void {
    this.accountService.addBalance(accountId, amount);
  }

  @Put('remove/:accountId')
  removeBalance(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('amount') amount: number,
  ): void {
    this.accountService.removeBalance(accountId, amount);
  }

  @Get('verify/:accountId')
  verifyAmountIntoBalanc(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('amount') amount: number,
  ): boolean {
    return this.accountService.verifyAmountIntoBalance(accountId, amount);
  }

  @Get('state/:accountId')
  getStat(@Param('accountId', ParseUUIDPipe) accountId: string): boolean {
    return this.accountService.getState(accountId);
  }

  @Put('state/:accountId')
  changeState(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('state') state: boolean,
  ): void {
    this.accountService.changeState(accountId, state);
  }

  @Get('type/:accountId')
  getAccountType(@Param('accountId') accountId: string): AccountTypeEntity {
    return this.accountService.getAccountType(accountId);
  }

  @Put()
  changeAccountType(
    @Param('accountId') accountid: string,
    @Param('accountTypeId') accountTypeId: string,
  ): AccountTypeEntity {
    return this.accountService.changeAccountType(accountid, accountTypeId);
  }

  @Delete(':accountId')
  deleteAccount(@Param('accountId', ParseUUIDPipe) accountId: string): void {
    this.accountService.deleteAccount(accountId);
  }
}
