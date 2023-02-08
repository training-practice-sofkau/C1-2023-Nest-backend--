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
import { Auth, GetCustomer } from 'src/common/decorators';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transferService: TransferService) {}

  @Get('')
  @Auth()
  //@UseGuards(AuthGuard())
  getAll(
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
    @Body('pagination') pagination: PaginationDto,
    @Body('dateRange') dateRange?: DateRangeDto,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.transferService.getHistoryByCustomer(
          customerId,
          <PaginationModel>pagination,
          <DateRangeModel>dateRange,
        ),
      ),
    );
  }

  @Get('account/:id')
  @Auth()
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
  @Auth()
  getByIncomeAccount(
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
  @Auth()
  getByOutcomeAccount(
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
  @Auth()
  createTransfer(
    @Body() createTransferDto: CreateTransferDto,
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.transferService.createTransfer(customerId, createTransferDto),
      ),
    );
  }

  @Delete(':id')
  @Auth()
  deleteTransfer(
    @Param('id', ParseUUIDPipe) depositId: string,
    @GetCustomer('id', ParseUUIDPipe) customerId: string,
  ): boolean {
    this.transferService.deleteTransfer(customerId, depositId);
    return true;
  }
}
