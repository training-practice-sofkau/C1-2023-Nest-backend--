import { IsNumberString, IsOptional } from 'class-validator';

export class DateTimeRangeDTO {
  @IsNumberString()
  @IsOptional()
  startDate?: number | Date;

  @IsNumberString()
  @IsOptional()
  endDate?: number | Date;
}
