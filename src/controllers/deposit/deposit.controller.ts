import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NewDepositDTO } from 'src/dtos/new-deposit-dto';
import { DepositEntity } from 'src/persistence';
import { DepositService } from 'src/services/deposit/deposit.service';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post()
  registerDeposit(@Body() deposit: NewDepositDTO): DepositEntity {
    return this.depositService.createDeposit(deposit);
  }

  @Delete()
  deleteCustomer(@Param('id') id: string): void {
    this.depositService.deleteDeposit(id);
  }
}
