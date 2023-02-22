import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { NewDepositDTO } from 'src/business/dtos';
import { DepositEntity } from 'src/data/persistence/entities';
import { DepositService } from 'src/business/service';
import { PaginationEntity } from 'src/data/persistence/entities/pagination.entity';
import { DataRangeEntity } from 'src/data/persistence/entities/data-range.entity';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  findAll(): DepositEntity[] {
    return this.depositService.findAll();
  }

  @Get(':id')
  getDeposit(@Param('id', new ParseUUIDPipe()) id: string): DepositEntity {
    return this.depositService.findOneById(id);
  }

  @Post('create')
  createDeposit(@Body() deposit: NewDepositDTO): DepositEntity {
    if (deposit.amount > 0) {
      return this.depositService.createDeposit(deposit);
    } else {
      throw new NotFoundException(`El Deposito debe ser un valor mayor a 0`);
    }
  }

  @Put('delete/:depositId')
  deleteDeposit(@Param('depositId') depositId: string): void {
    this.depositService.deleteDeposit(depositId);
  }

  @Post('/gethistory/:id')
  getHistory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: { actualPage: number; range: number },
  ): DepositEntity[] {
    const newPagination = new PaginationEntity();
    newPagination.actualPage = data.actualPage;
    const newDataRange = new DataRangeEntity();
    newDataRange.range = data.range;
    return this.depositService.getHistory(id, newPagination, newDataRange);
  }

  @Get('history/:id')
  history(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.depositService.getByCustomerId(id);
  }
}
