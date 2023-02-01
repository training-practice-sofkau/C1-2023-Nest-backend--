import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class NewDepositDTO {
  @IsUUID()
  account: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  dateTime: Date | number;
}
