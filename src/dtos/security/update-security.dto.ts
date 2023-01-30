import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
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
  readonly fullName: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
