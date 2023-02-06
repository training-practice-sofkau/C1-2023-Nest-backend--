import {
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { AccountDto } from '../account/account.dto';

export class CreateTransferDto {
  @IsObject()
  readonly outcome: AccountDto;
  @IsObject()
  readonly income: AccountDto;
  @IsNumber()
  @IsDate()
  readonly amount: number;
  @IsString()
  readonly reason: string;
  @IsDate()
  @IsNumber()
  readonly dateTime: Date | number;
  @IsOptional()
  @IsDate()
  @IsNumber()
  readonly deletedAt: Date | number;
}
