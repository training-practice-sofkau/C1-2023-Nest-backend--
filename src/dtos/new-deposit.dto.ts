import { IsNumber, IsUUID } from 'class-validator';

export class NewDeposit {
  @IsUUID()
  account: string;
  @IsNumber()
  amount = 0;
}
