import { Body, Controller, Post } from '@nestjs/common';
import { TransferDTO } from 'src/dtos';
import { TransferEntity } from 'src/persistence/entities';
import { TransferService } from 'src/services';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  createTransfer(@Body() transfer: TransferDTO): TransferEntity {
    return this.transferService.createTransfer(transfer);
  }
}
