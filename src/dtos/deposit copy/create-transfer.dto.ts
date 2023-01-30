import { IsDate, IsNumber, IsObject, IsOptional } from 'class-validator';
import { UpdateAccountDto } from '../account';

export class CreateTransferDto {
  @IsObject()
  readonly account: UpdateAccountDto;
  @IsNumber()
  @IsDate()
  readonly amount: number;
  readonly dateTime: Date | number;
  @IsDate()
  @IsNumber()
  @IsOptional()
  readonly deletedAt?: Date | number;
}
