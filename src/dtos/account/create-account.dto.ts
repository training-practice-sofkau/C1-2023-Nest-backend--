import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { CustomerDto } from '../customer';

export class CreateAccountDto {
  @IsObject()
  readonly customer: CustomerDto;
  @IsObject()
  readonly accountType?: { id: string; name: string; state: boolean };
  @IsNumber()
  readonly balance: number;
  @IsBoolean()
  @IsOptional()
  readonly state: boolean;
  @IsDate()
  @IsNumber()
  @IsOptional()
  readonly deletedAt: Date | number;
}
