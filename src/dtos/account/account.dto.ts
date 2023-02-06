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

export class AccountDto {
  @IsUUID()
  @IsString()
  readonly id: string;
  @IsObject()
  readonly customer: CustomerDto;
  @IsString()
  readonly accountType: { id: string; name: string; state: boolean };
  @IsNumber()
  readonly balance: number;
  @IsBoolean()
  readonly state: boolean;
  @IsOptional()
  @IsDate()
  @IsNumber()
  readonly deletedAt?: Date | number;
}
