import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { NewTransferDTO } from 'src/presentation/dtos/new-transfer.dto';
import { TransferEntity } from 'src/data/persistence';
import { TransferService } from 'src/business/services/transfer/transfer.service';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  registerDeposit(@Body() transfer: NewTransferDTO): TransferEntity {
    return this.transferService.createTransfer(transfer);
  }

  @Delete()
  deleteDeposit(@Param('id') id: string): void {
    this.transferService.deleteTransfer(id);
  }
}
