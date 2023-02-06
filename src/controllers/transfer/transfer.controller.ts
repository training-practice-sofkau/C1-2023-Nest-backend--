import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TransferDto } from 'src/dtos/transfer/transfer.dto';
import { DataRangeModel, PaginationModel } from 'src/models';
import { TransferEntity } from 'src/persistence/entities';
import { TransferService } from 'src/services';
import { v4 as uuid } from 'uuid';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  getAll(): string {
    return JSON.stringify(this.transferService.getAll());
  }

  @Get(':id,:page')
  getAllByAccount(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Param() page: number,
  ): string {
    const pages = <PaginationModel>{ size: 1, pages: 1, currentPage: page };
    return JSON.stringify(this.transferService.getHistory(accountId, pages));
  }

  @Get('id,:page,:dateInit,:dateEnd,:range')
  getByAccountAndDateRange(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Param() page: number,
    @Param() dateInit: number,
    @Param() dateEnd: number,
    @Param() range: number,
  ) {
    const pages = <PaginationModel>{ size: 1, pages: 1, currentPage: page };
    const dates = <DataRangeModel>{
      range: range,
      dateInit: dateInit,
      dateEnd: dateEnd,
    };
    return JSON.stringify(
      this.transferService.getHistory(accountId, pages, dates),
    );
  }

  @Get('income/:id,:page,:dateInit,:dateEnd,:range')
  getByIncomeAccountAndDateRange(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Param() page: number,
    @Param() dateInit: number,
    @Param() dateEnd: number,
    @Param() range: number,
  ) {
    const pages = <PaginationModel>{ size: 1, pages: 1, currentPage: page };
    const dates = <DataRangeModel>{
      range: range,
      dateInit: dateInit,
      dateEnd: dateEnd,
    };
    return JSON.stringify(
      this.transferService.getHistoryIn(accountId, pages, dates),
    );
  }

  @Get('outcome/:id,:page,:dateInit,:dateEnd,:range')
  getByOutcomeAccountAndDateRange(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Param() page: number,
    @Param() dateInit: number,
    @Param() dateEnd: number,
    @Param() range: number,
  ) {
    const pages = <PaginationModel>{ size: 1, pages: 1, currentPage: page };
    const dates = <DataRangeModel>{
      range: range,
      dateInit: dateInit,
      dateEnd: dateEnd,
    };
    return JSON.stringify(
      this.transferService.getHistoryOut(accountId, pages, dates),
    );
  }

  @Post()
  createTransfer(@Body() depositDto: TransferDto): string {
    let newTransfer = new TransferEntity();
    newTransfer = {
      ...depositDto,
      id: uuid(),
    };
    return JSON.stringify(this.transferService.createTransfer(newTransfer));
  }

  @Delete(':id')
  deleteTransfer(@Param('id', ParseUUIDPipe) depositId: string): void {
    this.transferService.deleteTransfer(depositId);
  }
}
