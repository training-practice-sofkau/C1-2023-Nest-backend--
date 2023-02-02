import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsInt()
  currentPage?: number;
  @IsOptional()
  @IsPositive()
  @IsInt()
  range?: number;
}
