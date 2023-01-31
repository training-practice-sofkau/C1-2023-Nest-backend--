import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NewDepositDTO } from 'src/presentation/dtos/new-deposit-dto';
import { DepositService } from 'src/services/deposit/deposit.service';
import { DepositEntity } from 'src/data/persistence';

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
