import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountDTO } from 'src/business/dtos';
import { AccountEntity } from '../../../data/persistence/entities';
import { AccountService } from '../../../business/services';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  getBalance(@Param('id') id: string): number {
    return this.accountService.getBalance(id);
  }

  @Post()
  createAccount(@Body() account: AccountDTO): AccountEntity {
    return this.accountService.createAccount(account);
  }

  @Post(':id')
  addBalance(@Param('id') id: string, @Body() amount: number): void {
    this.accountService.addBalance(id, amount);
  }

  @Get(':id')
  amountBalance(@Param('id') id: string, @Body() amount: number): boolean {
    return this.accountService.verifyAmountIntoBalance(id, amount);
  }

  @Put(':id')
  changeState(@Param('id') id: string, @Body() state: boolean): void {
    this.accountService.changeState(id, state);
  }

  @Delete()
  deleteAccount(@Body() customerId: string): void {
    this.accountService.deleteAccount(customerId);
  }
}
