import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsObject()
  readonly documentType: {
    id: string;
    name: string;
    state: boolean;
  };
  @IsString()
  @IsNotEmpty()
  readonly document: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  readonly fullName: string;
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly phone: string;
  @IsString()
  @IsNotEmpty()
  @Matches(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
  @MinLength(8)
  readonly password: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly avatarUrl?: string;
  @IsOptional()
  @IsBoolean()
  readonly state = true;
  @IsOptional()
  @IsDate()
  readonly deletedAt?: Date | number;
}
