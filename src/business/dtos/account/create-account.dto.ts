import { IsString, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsUUID()
  readonly customerId: string;
  @IsString()
  @IsUUID()
  readonly accountTypeId: string;
}
