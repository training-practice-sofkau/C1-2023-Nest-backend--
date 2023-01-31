import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateTransferDto, PaginationDto } from 'src/dtos';
import { DataRangeModel, PaginationModel } from 'src/data/models';
import { TransferService } from 'src/services';

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
    @Body() page: PaginationDto,
  ): JSON {
    const pages = <PaginationModel>{
      size: 1,
      pages: 1,
      currentPage: page.currentPage,
    };
    return JSON.parse(
      JSON.parse(
        JSON.stringify(this.transferService.getHistory(accountId, pages)),
      ),
    );
  }

  @Get('id')
  getByAccountAndDateRange(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() page: PaginationDto,
  ): JSON {
    const pages = <PaginationModel>{
      size: 1,
      pages: 1,
      currentPage: page.currentPage,
    };
    const dates = <DataRangeModel>{
      range: page.range,
      dateInit: page.dateInit,
      dateEnd: page.dateEnd,
    };
    return JSON.parse(
      JSON.stringify(this.transferService.getHistory(accountId, pages, dates)),
    );
  }

  @Get('income/:id')
  getByIncomeAccountAndDateRange(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() page: PaginationDto,
  ): JSON {
    const pages = <PaginationModel>{
      size: 1,
      pages: 1,
      currentPage: page.currentPage,
    };
    const dates = <DataRangeModel>{
      range: page.range,
      dateInit: page.dateInit,
      dateEnd: page.dateEnd,
    };
    return JSON.parse(
      JSON.stringify(
        this.transferService.getHistoryIn(accountId, pages, dates),
      ),
    );
  }

  @Get('outcome/:id')
  getByOutcomeAccountAndDateRange(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body() page: PaginationDto,
  ): JSON {
    const pages = <PaginationModel>{
      size: 1,
      pages: 1,
      currentPage: page.currentPage,
    };
    const dates = <DataRangeModel>{
      range: page.range,
      dateInit: page.dateInit,
      dateEnd: page.dateEnd,
    };
    return JSON.parse(
      JSON.stringify(
        this.transferService.getHistoryOut(accountId, pages, dates),
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
