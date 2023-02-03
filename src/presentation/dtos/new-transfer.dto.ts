import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class NewTransferDTO {
  @IsUUID()
  outcome: string;

  @IsUUID()
  income: string;

  @IsNumber()
  amount: number;

  reason: string;

  @IsNumber()
  dateTime: Date | number;
}
