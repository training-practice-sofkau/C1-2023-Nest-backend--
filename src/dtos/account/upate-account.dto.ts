import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAccountDto {
  @IsUUID()
  @IsString()
  @IsOptional()
  readonly id?: string;
  @IsString()
  @IsOptional()
  readonly customerId?: string;
  @IsString()
  @IsOptional()
  readonly accountTypeId?: string;
  @IsNumber()
  @IsOptional()
  readonly balance?: number;
  @IsBoolean()
  @IsOptional()
  readonly state?: boolean;
  @IsDate()
  @IsNumber()
  @IsOptional()
  readonly deletedAt?: Date | number;
}
