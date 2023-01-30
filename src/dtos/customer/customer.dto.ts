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

export class CustomerDto {
  @IsString()
  @IsUUID()
  readonly id: string;
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
  readonly fullName: string;
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
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
