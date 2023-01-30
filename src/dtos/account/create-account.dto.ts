import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  readonly customerId: string;
  @IsString()
  readonly accountTypeId: string;
  @IsNumber()
  readonly balance: number;
  @IsBoolean()
  readonly state: boolean;
  @IsDate()
  @IsNumber()
  readonly deletedAt: Date | number;
}
