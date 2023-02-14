import { IsBoolean, IsNumberString, IsUUID, } from "class-validator";

export class NewAccountDTO{
    @IsUUID()
    Customer: string;
    @IsUUID()
    accountType: string;
    @IsNumberString()   
    balance: string;
    @IsBoolean()
    state: boolean;
}