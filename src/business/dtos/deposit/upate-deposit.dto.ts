import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateDepositDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly id?: string;
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly accountId?: string;
  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly amount?: number;
  @IsOptional()
  @IsNumber()
  readonly dateTime?: Date | number;
  @IsOptional()
  @IsNumber()
  readonly deletedAt?: Date | number;
}
