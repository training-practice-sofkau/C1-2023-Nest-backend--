import { IsString } from 'class-validator';

export class NewAccountTypeDTO {
  @IsString()
  name: string;
}
