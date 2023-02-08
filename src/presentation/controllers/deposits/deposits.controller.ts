import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Delete,
} from '@nestjs/common';
import {
  CreateDepositDto,
  DateRangeDto,
  PaginationDto,
} from 'src/business/dtos';
import { DepositService } from 'src/business/services';
import { Auth, GetCustomer } from 'src/common/decorators';
import { DateRangeModel, PaginationModel } from 'src/data/models';

@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  @Auth()
  getAll(
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
    @Body() paginationDto: PaginationDto,
    @Body('dateRange') dateRange?: DateRangeDto,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.depositService.getHistoryByCustomer(
          customerId,
          <PaginationModel>paginationDto,
          <DateRangeModel>dateRange,
        ),
      ),
    );
  }

  @Get(':id')
  @Auth()
  getAllByAccount(
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body('pagination') pagination: PaginationDto,
    @Body('dateRange') dateRange?: DateRangeDto,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.depositService.getHistory(
          customerId,
          accountId,
          <PaginationModel>pagination,
          <DateRangeModel>dateRange,
        ),
      ),
    );
  }

  @Post()
  @Auth()
  createDeposit(
    @Body() createDepositDto: CreateDepositDto,
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.depositService.createDeposit(customerId, createDepositDto),
      ),
    );
  }

  @Delete(':id')
  @Auth()
  deleteDeposit(
    @Param('id', ParseUUIDPipe) depositId: string,
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
  ): boolean {
    this.depositService.deleteDeposit(customerId, depositId);
    return true;
  }
}
