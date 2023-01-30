import { IsNumberString, IsString, MaxLength } from "class-validator";

export class NewTransferDTO {
    outcome: number;
    income:number;
    @IsNumberString()
    amount: number;
    @IsString()
    @MaxLength(500)
    reason: string;
}