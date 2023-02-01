import { IsNumber, IsUUID } from 'class-validator';

export class NewAccountDto {
  @IsUUID()
  CustomerEntityId: string;
  @IsUUID()
  accontType: string;
  @IsNumber()
  balance: number;
}
