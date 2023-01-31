import {
    IsNumber,
    IsDate,
    IsUUID,
    IsString
} from 'class-validator';
export class NewDepositDTO {
    @IsUUID()
    account: string;
    @IsNumber()
    amount = 0;
}