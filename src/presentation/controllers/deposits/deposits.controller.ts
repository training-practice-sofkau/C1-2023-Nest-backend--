import { Delete } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateDepositDto, DateRangeDto, PaginationDto } from 'src/business';
import { DepositService } from 'src/business/services';
import { DateRangeModel, PaginationModel } from 'src/data';

@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  getAll(): JSON {
    return JSON.parse(JSON.stringify(this.depositService.getAll()));
  }

  @Get(':id')
  getAllByAccount(
    @Param('id', ParseUUIDPipe) accountId: string,
    @Body('pagination') pagination: PaginationDto,
    @Body('dateRange') dateRange?: DateRangeDto,
  ): JSON {
    return JSON.parse(
      JSON.stringify(
        this.depositService.getHistory(
          accountId,
          <PaginationModel>pagination,
          <DateRangeModel>dateRange,
        ),
      ),
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
