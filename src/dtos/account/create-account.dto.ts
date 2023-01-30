import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAccountDto {
  @IsObject()
  readonly customer: {
    id: string;
    documentType: {
      id: string;
      name: string;
      state: boolean;
    };
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string;
    state: boolean;
    deletedAt?: Date | number;
  };
  @IsObject()
  readonly accountType: {
    id: string;
    name: string;
    state: boolean;
  };
  @IsNumber()
  readonly balance: number;
  @IsBoolean()
  @IsOptional()
  readonly state: boolean;
  @IsDate()
  @IsNumber()
  @IsOptional()
  readonly deletedAt: Date | number;
}
