import {
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AccountDto } from '../account/account.dto';

export class UpdateTransferDto {
  @IsOptional()
  @IsUUID()
  @IsString()
  readonly id: string;
  @IsOptional()
  @IsObject()
  readonly outcome: AccountDto;
  @IsOptional()
  @IsObject()
  readonly income: AccountDto;
  @IsOptional()
  @IsNumber()
  @IsDate()
  readonly amount: number;
  @IsOptional()
  @IsString()
  readonly reason: string;
  @IsOptional()
  @IsDate()
  @IsNumber()
  readonly dateTime: Date | number;
  @IsOptional()
  @IsDate()
  @IsNumber()
  readonly deletedAt: Date | number;
}
