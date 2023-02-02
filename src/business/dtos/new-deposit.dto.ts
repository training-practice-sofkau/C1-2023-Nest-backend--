import { IsNumber, IsUUID } from 'class-validator';

export class NewDepositDTO {
  @IsUUID()
  accountId: string;
  @IsNumber()
  amount = 0;
}
