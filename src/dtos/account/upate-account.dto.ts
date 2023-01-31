import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly id?: string;
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly customerId?: string;
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly accountTypeId?: string;
  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly balance?: number;
  @IsOptional()
  @IsBoolean()
  readonly state?: boolean;
  @IsOptional()
  @IsNumber()
  readonly deletedAt?: Date | number;
}
