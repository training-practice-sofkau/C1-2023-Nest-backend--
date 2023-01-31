import { Delete } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateDepositDto } from 'src/business/dtos';
import { PaginationDto } from 'src/business/dtos/pagination/pagination.dto';
import { DataRangeModel, PaginationModel } from 'src/data/models';
import { DepositService } from 'src/business/services';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  getAll(): JSON {
    return JSON.parse(JSON.stringify(this.depositService.getAll()));
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
      JSON.stringify(this.depositService.getHistory(accountId, pages)),
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
      JSON.stringify(this.depositService.getHistory(accountId, pages, dates)),
    );
  }

  @Post()
  createDeposit(@Body() createDepositDto: CreateDepositDto): JSON {
    return JSON.parse(
      JSON.stringify(this.depositService.createDeposit(createDepositDto)),
    );
  }

  @Delete(':id')
  deleteDeposit(@Param('id', ParseUUIDPipe) depositId: string): void {
    this.depositService.deleteDeposit(depositId);
  }
}
