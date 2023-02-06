import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateTransferDto {
  @IsOptional()
  @IsUUID()
  @IsString()
  readonly id?: string;
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly outcomeId?: string;
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly incomeId?: string;
  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly amount?: number;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  readonly reason?: string;
  @IsOptional()
  @IsNumber()
  readonly dateTime?: Date | number;
  @IsOptional()
  @IsDate()
  @IsNumber()
  readonly deletedAt?: Date | number;
}
