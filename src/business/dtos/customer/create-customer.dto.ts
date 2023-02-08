import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsUUID()
  readonly documentTypeId: string;
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(12)
  readonly document: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  readonly fullName: string;
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly phone: string;
  @IsString()
  @IsNotEmpty()
  @Matches(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
  @MinLength(8)
  readonly password: string;
  @IsOptional()
  @IsUrl()
  readonly avatarUrl?: string;
}
