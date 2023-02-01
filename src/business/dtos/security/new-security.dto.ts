import { IsString } from "class-validator";

export class NewSecurityDTO{
    @IsString()
    email:string;
    @IsString()
    password:string
}