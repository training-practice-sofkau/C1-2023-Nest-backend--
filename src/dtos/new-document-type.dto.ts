import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

export class NewDocumentTypeDTO {
  @IsString()
  name: string;
}
