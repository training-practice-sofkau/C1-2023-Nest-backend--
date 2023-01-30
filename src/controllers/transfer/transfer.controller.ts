import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { DataRangeModel, PaginationModel } from 'src/models';
import { TransferService } from 'src/services';

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

  @Post()
  createDeposit(@Body() depositDto: DepositDto): string {
    let newDeposit = new DepositEntity();
    newDeposit = {
      ...depositDto,
      id: uuid(),
    };
    return JSON.stringify(this.transferService.createDeposit(newDeposit));
  }

  @Delete(':id')
  deleteDeposit(@Param('id', ParseUUIDPipe) depositId: string): void {
    this.transferService.deleteDeposit(depositId);
  }
}
