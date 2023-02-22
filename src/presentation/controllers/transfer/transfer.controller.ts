import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { NewTransferDTO } from 'src/business/dtos';
import { TransferEntity } from 'src/data/persistence/entities';
import { TransferService } from 'src/business/service/transfer';
import { PaginationEntity } from 'src/data/persistence/entities/pagination.entity';
import { DataRangeEntity } from 'src/data/persistence/entities/data-range.entity';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}
  @Get()
  findAll() {
    return this.transferService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.transferService.findOneById(id);
  }

  @Post('create')
  createTransfer(@Body() transfer: NewTransferDTO): TransferEntity {
    return this.transferService.createTransfer(transfer);
  }

  @Get('/hOut/:id')
  getHistoryOut(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: { actualPage: number; range: number },
  ) {
    const newPagination = new PaginationEntity();
    newPagination.actualPage = data.actualPage;
    const newDataRange = new DataRangeEntity();
    newDataRange.range = data.range;
    return this.transferService.getHistoryOut(id, newPagination, newDataRange);
  }

  @Get('/hIncome/:id')
  getHistoryIncome(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: { actualPage: number; range: number },
  ) {
    const newPagination = new PaginationEntity();
    newPagination.actualPage = data.actualPage;
    const newDataRange = new DataRangeEntity();
    newDataRange.range = data.range;
    return this.transferService.getHistoryIn(id, newPagination, newDataRange);
  }

  @Post('history/:id')
  getTransferHistory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: { actualPage: number; range: number },
  ) {
    const newPagination = new PaginationEntity();
    newPagination.actualPage = data.actualPage;
    const newDataRange = new DataRangeEntity();
    newDataRange.range = data.range;
    let historyOut: TransferEntity[];
    try {
      historyOut = this.transferService.getHistoryOut(
        id,
        newPagination,
        newDataRange,
      );
    } catch (error) {
      historyOut = [];
    }

    let historyIn: TransferEntity[];
    try {
      historyIn = this.transferService.getHistoryIn(
        id,
        newPagination,
        newDataRange,
      );
    } catch (error) {
      historyIn = [];
    }

    return [...historyOut, ...historyIn];
  }
}
