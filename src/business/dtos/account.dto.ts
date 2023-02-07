import {
  IsBoolean,
  IsDateString,
  IsNumberString,
  IsUUID,
} from 'class-validator';

export class AccountDTO {
  @IsUUID()
  accountTypeId: string;

  @IsUUID()
  customerId: string;

  @IsNumberString()
  balance: string;

  @IsBoolean()
  state: boolean;
}
