import { Delete } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { DepositDto } from 'src/dtos/deposit/deposit.dto';
import { DataRangeModel, PaginationModel } from 'src/models';
import { DepositEntity } from 'src/persistence/entities';
import { DepositService } from 'src/services';
import { v4 as uuid } from 'uuid';

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

  @Post()
  createDeposit(@Body() depositDto: DepositDto): string {
    let newDeposit = new DepositEntity();
    newDeposit = {
      ...depositDto,
      id: uuid(),
    };
    return JSON.stringify(this.depositService.createDeposit(newDeposit));
  }

  @Delete(':id')
  deleteDeposit(@Param('id', ParseUUIDPipe) depositId: string): void {
    this.depositService.deleteDeposit(depositId);
  }
}
