import { Controller, Get, Param, Query } from '@nestjs/common';
import { DataRangeModel } from 'src/models/data-range.model';
import { PaginationModel } from 'src/models/pagination.model';
import { TransferEntity } from 'src/persistence/entities/transfer.entity';
import { TransferService } from 'src/services/transfer/transfer.service';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get('/:accountId/history/out')
  async getHistoryOut(
    @Param('accountId') accountId: string,
    @Query() pagination: PaginationModel,
    @Query() dataRange?: DataRangeModel,
  ):Promise<TransferEntity[]> {
    return this.transferService.getHistoryOut(accountId, pagination, dataRange);
  }

  @Get('/:accountId/history/in')
  async getHistoryIn(
    @Param('accountId') accountId: string,
    @Query() pagination: PaginationModel,
    @Query() dataRange?: DataRangeModel,
  ): Promise <TransferEntity[]>{
    return this.transferService.getHistoryIn(accountId, pagination, dataRange);
  }

  @Get('/:accountId/history')
  getHistory(
    @Param('accountId') accountId: string,
    @Query() pagination: PaginationModel,
    @Query() dataRange?: DataRangeModel,
  ): TransferEntity[] {
    return this.transferService.getHistory(accountId, pagination, dataRange);
  }
}
