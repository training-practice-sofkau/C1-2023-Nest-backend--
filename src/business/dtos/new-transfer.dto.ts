import { IsNumber, IsNumberString, IsString, IsUUID, MaxLength } from "class-validator";

export class NewTransferDTO {
    @IsUUID()
    outcome: string;
    @IsUUID()
    income: string;
    @IsNumber()
    amount: number;
    @IsString()
    reason: string;
  }