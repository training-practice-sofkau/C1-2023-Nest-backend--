import {
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateAccountDto } from '../account';

export class UpdateDepositDto {
  @IsUUID()
  @IsString()
  @IsOptional()
  readonly id?: string;
  @IsObject()
  readonly account: CreateAccountDto;
  @IsNumber()
  @IsDate()
  readonly amount: number;
  readonly dateTime: Date | number;
  @IsDate()
  @IsNumber()
  @IsOptional()
  readonly deletedAt?: Date | number;
}
