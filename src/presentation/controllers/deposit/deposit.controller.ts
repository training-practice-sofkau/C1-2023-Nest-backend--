import { Delete } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateDepositDto, PaginationDto } from 'src/business';
import { DepositService } from 'src/business/services';
import { DateRangeModel, PaginationModel } from 'src/data';

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
        this.depositService.getHistory(
          accountId,
          paginationModel,
          dateRangeModule,
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
