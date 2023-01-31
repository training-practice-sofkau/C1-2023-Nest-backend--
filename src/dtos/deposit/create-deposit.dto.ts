import { IsInt, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateDepositDto {
  @IsString()
  @IsUUID()
  readonly accountId: string;
  @IsPositive()
  @IsInt()
  readonly amount: number;
  @IsNumber()
  readonly dateTime: Date | number;
}
