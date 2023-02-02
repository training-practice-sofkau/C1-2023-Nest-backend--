import { IsNumberString, IsUUID } from 'class-validator';

export class NewAccountDto {
  @IsUUID()
  CustomerEntityId: string; //id cliente
  @IsUUID()
  accontType: string; //id tipo de cuenta
  @IsNumberString()
  balance: string; //dinero con el que se quiere crear en la cuenta
}
