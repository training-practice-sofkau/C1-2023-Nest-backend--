import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NewAccountDTO } from 'src/presentation/dtos/new-account.dto';
import { AccountEntity } from 'src/data/persistence';
import { AccountService } from 'src/business/services/account/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  findAllAccounts(): AccountEntity[] {
    return this.accountService.findAll();
  }

  @Post()
  registerAccount(@Body() account: NewAccountDTO): AccountEntity {
    return this.accountService.createAccount(account);
  }

  @Put('/:id')
  UpdateAccount(
    @Body() account: NewAccountDTO,
    @Param('id') id: string,
  ): AccountEntity {
    return this.accountService.updatedAccount(id, account);
  }

  @Get('/balance/:id')
  getBalance(@Param('id') id: string): number {
    return this.accountService.getBalance(id);
  }

  @Post('/balance/add/:id')
  addBalance(@Param('id') id: string, @Query('amount') amount: number): void {
    return this.accountService.addBalance(id, amount);
  }

  @Post('/balance/remove/:id')
  removeBalance(
    @Param('id') id: string,
    @Query('amount') amount: number,
  ): void {
    return this.accountService.removeBalance(id, amount);
  }

  @Get('/verifyAmountIntoBalance/:id')
  verifyAmountIntoBalance(
    @Param('id') id: string,
    @Query('amount') amount: number,
  ): boolean {
    return this.accountService.verifyAmountIntoBalance(id, amount);
  }

  @Get('/state/:id')
  getState(@Param('id') id: string): boolean {
    return this.accountService.getState(id);
  }

  @Post('/state/:id')
  changeState(@Param('id') id: string, @Query('state') state: string): void {
    return this.accountService.changeState(id, state);
  }

  @Get('/accountType/:id')
  getAccountType(@Param('id') id: string) {
    return this.accountService.getAccountType(id);
  }

  @Post('/state')
  changeAccountType(@Param('id') id: string, accountTypeId: string): void {
    this.accountService.changeAccountType(id, accountTypeId);
  }

  @Delete('/:id')
  deleteAccount(@Param('id') id: string): void {
    return this.accountService.deleteAccount(id);
  }
}
