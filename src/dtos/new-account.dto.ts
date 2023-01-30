import { IsNumberString, IsString, IsUUID, MaxLength } from "class-validator";

export class NewAccountDTO{
    @IsUUID()
    customer: string;
    @IsUUID()
    accountType: string;   
    @IsNumberString()
    document: string;
    @IsEmail()
    email: string;
    @IsNumberString()
    @MaxLength(30)
    phone: string;
    @IsString()
    @MaxLength(500)
    fullName: string;
}