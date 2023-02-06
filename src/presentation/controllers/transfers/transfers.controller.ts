import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  CreateTransferDto,
  DateRangeDto,
  PaginationDto,
} from 'src/business/dtos';
import { DateRangeModel, PaginationModel } from 'src/data/models';
import { TransferService } from 'src/business/services';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  getAll(): JSON {
    return JSON.parse(JSON.stringify(this.transferService.getAll()));
  }

  @Get(':id')
  getAllByAccount(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body('pagination') pagination: PaginationDto,
    @Body('dateRange') dateRange?: DateRangeDto,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.transferService.getHistory(
          accountId,
          <PaginationModel>pagination,
          <DateRangeModel>dateRange,
        ),
      ),
    );
  }

  @Get('income/:id')
  getByIncomeAccountAndDateRange(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body('pagination') pagination: PaginationDto,
    @Body('dateRange') dateRange?: DateRangeDto,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.transferService.getHistoryIn(
          accountId,
          <PaginationModel>pagination,
          <DateRangeModel>dateRange,
        ),
      ),
    );
  }

  @Get('outcome/:id')
  getByOutcomeAccountAndDateRange(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body('pagination') pagination: PaginationDto,
    @Body('dateRange') dateRange?: DateRangeDto,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.transferService.getHistoryOut(
          accountId,
          <PaginationModel>pagination,
          <DateRangeModel>dateRange,
        ),
      ),
    );
  }

  @Post()
  createTransfer(@Body() createTransferDto: CreateTransferDto): JSON {
    return JSON.parse(
      JSON.stringify(this.transferService.createTransfer(createTransferDto)),
    );
  }

  @Delete(':id')
  deleteTransfer(@Param('id', ParseUUIDPipe) depositId: string): void {
    this.transferService.deleteTransfer(depositId);
  }
}
