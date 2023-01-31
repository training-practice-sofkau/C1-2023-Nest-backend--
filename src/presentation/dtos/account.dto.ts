import { IsString } from "class-validator";

export class AccountDTO {
    @IsString()
    customer: string;
    @
    accountType: string;
    balance: number;
    state = true;
    customerId: string;
    accountTypeId: string; 
}