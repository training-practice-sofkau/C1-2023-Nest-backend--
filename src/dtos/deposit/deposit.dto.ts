import { IsDate, IsNumber, IsObject, IsString, IsUUID } from 'class-validator';
import { AccountDto } from '../account/account.dto';

export class DepositDto {
  @IsUUID()
  @IsString()
  readonly id: string;
  @IsObject()
  readonly account: AccountDto;
  @IsNumber()
  @IsDate()
  readonly amount: number;
  readonly dateTime: Date | number;
  @IsDate()
  @IsNumber()
  readonly deletedAt: Date | number;
}
