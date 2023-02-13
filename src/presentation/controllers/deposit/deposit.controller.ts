import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { NewDepositDTO } from 'src/presentation/dtos/new-deposit-dto';
import { DepositEntity } from 'src/data/persistence';
import { DepositService } from 'src/business/services/deposit/deposit.service';
import { PaginationDTO } from 'src/presentation/dtos/pagination.dto';
import { DateTimeRangeDTO } from 'src/presentation/dtos/date-time-range.dto';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post()
  register(@Body() deposit: NewDepositDTO): DepositEntity {
    return this.depositService.createDeposit(deposit);
  }

  @Delete()
  delete(@Param('id') id: string): void {
    this.depositService.deleteDeposit(id);
  }

  @Get('/:id')
  getHistory(
    @Param('id') id: string,
    @Query() paginationDTO: PaginationDTO,
    @Query() dateTimeDTO?: DateTimeRangeDTO,
  ): DepositEntity[] {
    return this.depositService.getHistory(id, paginationDTO, dateTimeDTO);
  }
}

//@Query('limit') limit: number,
//@Query('offset') offset: number,
