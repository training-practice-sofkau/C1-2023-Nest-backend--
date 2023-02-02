import { IsOptional, IsPositive } from 'class-validator';

export class DateRangeDto {
  @IsOptional()
  @IsPositive()
  dateInit?: number | Date;
  @IsOptional()
  @IsPositive()
  dateEnd?: number | Date;
}
