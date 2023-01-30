import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CustomerDto } from '../customer';

export class UpdateAccountDto {
  @IsUUID()
  @IsString()
  @IsOptional()
  readonly id?: string;
  @IsOptional()
  @IsObject()
  readonly customer: CustomerDto;
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
