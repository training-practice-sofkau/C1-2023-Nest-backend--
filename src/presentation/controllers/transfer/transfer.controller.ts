import { Body, Controller, Post } from '@nestjs/common';
import { TransferDTO } from 'src/business/dtos';
import { TransferEntity } from '../../../data/persistence/entities';
import { TransferService } from '../../../business/services';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  createTransfer(@Body() transfer: TransferDTO): TransferEntity {
    return this.transferService.createTransfer(transfer);
  }
}