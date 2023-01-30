import {
    IsNumber,
    IsDate,
    IsUUID,
    IsString,
    IsNumberString
} from 'class-validator';
export class NewTransferDTO {
    @IsUUID()
    outcome: string;
    @IsUUID()
    income: string;
    @IsNumberString()
    amount: number;
    @IsString()
    reason: string;
}