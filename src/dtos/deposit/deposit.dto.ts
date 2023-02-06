import {
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
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
  @IsDate()
  @IsNumber()
  readonly dateTime: Date | number;
  @IsOptional()
  @IsDate()
  @IsNumber()
  readonly deletedAt: Date | number;
}
