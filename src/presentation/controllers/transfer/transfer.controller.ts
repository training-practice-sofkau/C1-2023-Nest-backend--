import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateTransferDto, PaginationDto } from 'src/business/dtos';
import { DateRangeModel, PaginationModel } from 'src/data/models';
import { TransferService } from 'src/business/services';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  getAll(): JSON {
    return JSON.parse(JSON.stringify(this.transferService.getAll()));
  }

  @Get(':id')
  getAllByAccount(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() pagination: PaginationDto,
  ): JSON {
    const paginationModel = <PaginationModel>{
      range: pagination.range,
      currentPage: pagination.currentPage ?? 1,
    };
    const dateRangeModule = <DateRangeModel>{
      dateInit: pagination.dateInit,
      dateEnd: pagination.dateEnd,
    };
    return JSON.parse(
      JSON.stringify(
        this.transferService.getHistory(
          accountId,
          paginationModel,
          dateRangeModule,
        ),
      ),
    );
  }

  @Get('income/:id')
  getByIncomeAccountAndDateRange(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() pagination: PaginationDto,
  ): JSON {
    const paginationModel = <PaginationModel>{
      range: pagination.range,
      currentPage: pagination.currentPage ?? 1,
    };
    const dateRangeModule = <DateRangeModel>{
      dateInit: pagination.dateInit,
      dateEnd: pagination.dateEnd,
    };
    return JSON.parse(
      JSON.stringify(
        this.transferService.getHistoryIn(
          accountId,
          paginationModel,
          dateRangeModule,
        ),
      ),
    );
  }

  @Get('outcome/:id')
  getByOutcomeAccountAndDateRange(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() pagination: PaginationDto,
  ): JSON {
    const paginationModel = <PaginationModel>{
      range: pagination.range,
      currentPage: pagination.currentPage ?? 1,
    };
    const dateRangeModule = <DateRangeModel>{
      dateInit: pagination.dateInit,
      dateEnd: pagination.dateEnd,
    };
    return JSON.parse(
      JSON.stringify(
        this.transferService.getHistoryOut(
          accountId,
          paginationModel,
          dateRangeModule,
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
