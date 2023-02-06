import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateTransferDto {
  @IsString()
  @IsUUID()
  readonly outcomeId: string;
  @IsString()
  @IsUUID()
  readonly incomeId: string;
  @IsPositive()
  @IsInt()
  readonly amount: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  readonly reason: string;
  @IsNumber()
  readonly dateTime: Date | number;
}
