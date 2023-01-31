import {
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AccountDto } from '../account/account.dto';

export class TransferDto {
  @IsUUID()
  @IsString()
  readonly id: string;
  @IsObject()
  readonly outcome: AccountDto;
  @IsObject()
  readonly income: AccountDto;
  @IsNumber()
  @IsDate()
  readonly amount: number;
  @IsDate()
  @IsNumber()
  readonly dateTime: Date | number;
  @IsDate()
  @IsNumber()
  @IsOptional()
  readonly deletedAt: Date | number;
  @IsString()
  readonly reason: string;
}
