import { Controller, Get, Param, Query } from '@nestjs/common';
import { DataRangeModel } from 'src/data/models/data-range.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { TransferEntity } from 'src/data/persistence/entities/transfer.entity';
import { TransferService } from 'src/business/services/transfer/transfer.service';

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
