import { Param } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { DataRangeModel, PaginationModel } from 'src/models';
import { DepositService } from 'src/services';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  getAll(): string {
    return JSON.stringify(this.depositService.getAll());
  }

  @Get(':id,:page')
  getAllByAccount(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Param() page: number,
  ): string {
    const pages = <PaginationModel>{ size: 1, pages: 1, currentPage: page };
    return JSON.stringify(this.depositService.getHistory(accountId, pages));
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
      this.depositService.getHistory(accountId, pages, dates),
    );
  }
}
