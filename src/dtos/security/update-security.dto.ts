import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateSecurityDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly id: string;
  @IsOptional()
  @IsObject()
  readonly documentType: {
    id: string;
    name: string;
    state: boolean;
  };
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly document: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  readonly fullName: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly phone: string;
  @IsOptional()
  @IsString()
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
