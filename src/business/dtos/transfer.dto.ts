import {
  IsDateString,
  IsNumberString,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class TransferDTO {
  @IsUUID()
  outComeId: string;

  @IsUUID()
  inComeId: string;

  @IsNumberString()
  amount: string;

  @IsString()
  @MaxLength(500)
  reason: string;

  @IsString()
  dateTime: string;
}
