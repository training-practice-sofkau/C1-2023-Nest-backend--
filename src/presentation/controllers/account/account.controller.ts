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
import { AccountService } from 'src/services/account/account.service';
import { AccountEntity } from 'src/data/persistence';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  findAllAccounts(): AccountEntity[] {
    console.log('entra en get');
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
    console.log('entra en put');
    return this.accountService.updatedAccount(id, account);
  }

  @Get('/balance/:id')
  findAllBalance(@Param('id') id: string): number {
    return this.accountService.getBalance(id);
  }

  @Post('/balance/:id')
  addBalance(@Param('id') id: string, @Query('amount') amount: number): void {
    return this.accountService.addBalance(id, amount);
  }

  @Post('/balance/:id')
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

  @Get('/state')
  getState(@Param('id') id: string): boolean {
    return this.accountService.getState(id);
  }

  @Post('/state')
  changeState(@Param('id') id: string, state: boolean): void {
    this.accountService.changeState(id, state);
  }

  @Get()
  getAccountType(@Param('id') id: string) {
    this.accountService.getAccountType(id);
  }

  @Post('/state')
  changeAccountType(@Param('id') id: string, accountTypeId: string): void {
    this.accountService.changeAccountType(id, accountTypeId);
  }

  @Delete()
  deleteAccount(@Param('id') id: string): void {
    this.accountService.deleteAccount(id);
  }
}
