import { IsNumberString, IsUUID, } from "class-validator";

export class NewAccountDTO{
    @IsUUID()
    CustomerEntity: string;
    @IsUUID()
    accountType: string;
    @IsNumberString()   
    balance: number;
}