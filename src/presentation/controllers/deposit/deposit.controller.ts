import { Body, Controller, Delete, Post } from '@nestjs/common';
import { DepositDTO } from 'src/business/dtos';
import { DepositEntity } from '../../../data/persistence/entities';
import { DepositService } from '../../../business/services';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}
  @Post()
  createDeposit(@Body() account: DepositDTO): DepositEntity {
    return this.depositService.createDeposit(account);
  }

  @Delete()
  deleteDeposit(@Body() despositId: string): void {
    this.depositService.deleteDeposit(despositId);
  }
}
