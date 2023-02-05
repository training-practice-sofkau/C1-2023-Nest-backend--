import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationDTO {
  @IsNumberString()
  limit: number;

  @IsNumberString()
  offset: number;
}
