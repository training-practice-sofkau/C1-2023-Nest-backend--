import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { NewTransferDTO } from 'src/presentation/dtos/new-transfer.dto';
import { TransferEntity } from 'src/data/persistence';
import { TransferService } from 'src/business/services/transfer/transfer.service';
import { PaginationDTO } from 'src/presentation/dtos/pagination.dto';
import { DateTimeRangeDTO } from 'src/presentation/dtos/date-time-range.dto';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  registerDeposit(@Body() transfer: NewTransferDTO): TransferEntity {
    return this.transferService.createTransfer(transfer);
  }

  @Delete('/:id')
  deleteDeposit(@Param('id') id: string): void {
    this.transferService.deleteTransfer(id);
  }

  //Obtener historial de transacciones de salida de una cuenta
  @Get('/outcome/:id')
  getHistoryOut(
    @Param('id') id: string,
    @Query() paginationDTO: PaginationDTO,
    @Query() dateTimeDTO?: DateTimeRangeDTO,
  ): TransferEntity[] {
    return this.transferService.getHistoryOut(id, paginationDTO, dateTimeDTO);
  }

  //Obtener historial de transacciones de entrada de una cuenta
  @Get('/income/:id')
  getHistoryIn(
    @Param('id') id: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('startDate') startDate: number,
    @Query('endDate') endDate: number,
  ): TransferEntity[] {
    return this.transferService.getHistoryIn(
      id,
      { limit, offset },
      { startDate, endDate },
    );
  }

  @Get('/:id')
  getHistory(
    @Param('id') id: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('startDate') startDate: number,
    @Query('endDate') endDate: number,
  ): TransferEntity[] {
    return this.transferService.getHistory(
      id,
      { limit, offset },
      { startDate, endDate },
    );
  }
}
