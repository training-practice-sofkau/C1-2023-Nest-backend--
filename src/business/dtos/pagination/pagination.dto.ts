import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @IsInt()
  currentPage?: number;
  @IsOptional()
  @IsPositive()
  @IsInt()
  range?: number;
  @IsOptional()
  @IsPositive()
  dateInit?: number | Date;
  @IsOptional()
  @IsPositive()
  dateEnd?: number | Date;
}
