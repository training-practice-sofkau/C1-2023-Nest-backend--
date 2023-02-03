import { IsNumberString, IsUUID } from "class-validator";

export class NewDepositDTO{
    @IsUUID()
    account: string;
    @IsNumberString()
    amount: number;
}
