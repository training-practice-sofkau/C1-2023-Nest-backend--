import {
    IsNumber,
    IsDate,
    IsUUID,
    IsString
} from 'class-validator';
export class DepositDTO {
    @IsUUID()
    account: string;
    @IsNumber()
    amount = 0;
    @IsString()
    dateTime: number | Date;
    @IsString()
    deletedAt?: number | Date | undefined;
}