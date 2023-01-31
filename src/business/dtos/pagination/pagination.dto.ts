import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsInt()
  currentPage: number;
  @IsOptional()
  @IsPositive()
  @IsInt()
  range?: number;
  @IsOptional()
  @IsNumber()
  dateInit?: number | Date;
  @IsOptional()
  @IsNumber()
  dateEnd?: number | Date;
}
