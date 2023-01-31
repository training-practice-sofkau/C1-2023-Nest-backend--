import {
    IsNumber,
    IsUUID,
} from 'class-validator';
export class NewAccountDTO {
    @IsUUID()
    customer: string;
    @IsUUID()
    accountType: string;
    @IsNumber()
    balance: number;
}