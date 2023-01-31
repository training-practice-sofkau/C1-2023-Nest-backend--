import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { NewTransferDTO } from 'src/presentation/dtos/new-transfer.dto';
import { TransferService } from 'src/services/transfer/transfer.service';
import { TransferEntity } from 'src/data/persistence';

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
