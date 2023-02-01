import { IsNumber, IsUUID } from 'class-validator';

export class NewDepositDTO {
  @IsUUID()
  account: string;
  @IsNumber()
  amount = 0;
}
