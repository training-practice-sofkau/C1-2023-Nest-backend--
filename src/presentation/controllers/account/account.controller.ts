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

  @Get('balance/:id')
  getBalance(@Param('id') id: string): number {
    return this.accountService.getBalance(id);
  }

  @Get()
  getAll(): AccountEntity[] {
    return this.accountService.findAll();
  }

  @Post()
  createAccount(@Body() account: AccountDTO): AccountEntity {
    return this.accountService.createAccount(account);
  }

  @Post(':id')
  addBalance(
    @Param('id') id: string,
    @Body() body: { amount: number },
  ): string {
    if (body.amount < 0) return 'debe ser un numero positivo';
    this.accountService.addBalance(id, body.amount);
    return '' + this.accountService.getBalance(id);
  }

  @Put('removebalance/:id')
  removeBalance(
    @Param('id') id: string,
    @Body() body: { amount: number },
  ): string {
    if (body.amount < 0) return 'debe ser un numero positivo';
    this.accountService.removeBalance(id, body.amount);
    return '' + this.accountService.getBalance(id);
  }

  @Get('/customer/:id')
  getAccountByCustomerId(@Param('id') id: string): AccountEntity[] {
    return this.accountService.getAccountByCustomerId(id);
  }

  @Get('/account/:id')
  amountBalance(
    @Param('id') id: string,
    @Body() body: { amount: number },
  ): boolean {
    return this.accountService.verifyAmountIntoBalance(id, body.amount);
  }

  @Put(':id')
  changeState(
    @Param('id') id: string,
    @Body() body: { state: boolean },
  ): string {
    this.accountService.changeState(id, body.state);
    return 'estado cambiado';
  }

  @Get('state/:id')
  getState(@Param('id') id: string): boolean {
    return this.accountService.getState(id);
  }

  @Put('accountype/:id')
  changeAccountType(
    @Param('id') id: string,
    @Body() body: { accountTypeId: string },
  ): string {
    this.accountService.changeAccountType(id, body.accountTypeId);
    return 'cuenta cambiada';
  }

  @Delete(':id')
  deleteAccount(@Param('id') id: string): string {
    this.accountService.deleteAccount(id);
    return 'cuenta eliminada';
  }
}
