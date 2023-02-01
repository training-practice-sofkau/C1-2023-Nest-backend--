import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NewDepositDTO } from 'src/dtos';
import { DepositEntity } from 'src/persistence/entities';
import { DepositService } from 'src/services';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('newRepo')
  createDeposit(@Body() deposit: NewDepositDTO): DepositEntity {
    return this.depositService.createDeposit(deposit);
  }

  @Put('delete/:depositId')
  deleteDeposit(@Param('depositId') depositId: string): void {
    this.depositService.deleteDeposit(depositId);
  }

  //   @Get("/:id")
  //   getHistory(@Param('id', ParseUUIDPipe): depositId: string): DepositEntity[] {
  //     return this.depositService.getHistory(depositId);
  //   }
}
