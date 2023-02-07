import {
  IsEmail,
  IsNumberString,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CustomerUpdateDTO {
  @IsNumberString()
  document: string;

  @IsString()
  @MaxLength(500)
  fullName: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  @MaxLength(30)
  phone: string;
}
