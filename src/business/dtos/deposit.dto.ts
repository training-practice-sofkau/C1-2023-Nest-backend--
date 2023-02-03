import { IsNumberString, IsString, IsUUID } from 'class-validator';

export class DepositDTO {
  @IsUUID()
  accountId: string;

  @IsNumberString()
  amount: string;

  @IsString()
  dateTime: string;
}
