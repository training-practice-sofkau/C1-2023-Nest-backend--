import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
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
  @IsString()
  @IsUUID()
  readonly documentTypeId?: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  readonly document?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  readonly fullName?: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly phone?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
  @MinLength(8)
  readonly password?: string;
  @IsOptional()
  @IsUrl()
  readonly avatarUrl?: string;
  @IsOptional()
  @IsBoolean()
  readonly state?: boolean;
  @IsOptional()
  @IsNumber()
  readonly deletedAt?: Date | number;
}
