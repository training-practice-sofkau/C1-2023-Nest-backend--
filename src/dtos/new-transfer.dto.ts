import { IsNumberString, IsString, IsUUID, MaxLength } from "class-validator";

export class NewTransferDTO {
    @IsUUID()
    outcome: number;
    @IsUUID()
    income:number;
    @IsNumberString()
    amount: number;
    @IsString()
    @MaxLength(500)
    reason: string;
}