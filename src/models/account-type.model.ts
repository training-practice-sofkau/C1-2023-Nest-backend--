import {AccountMoldel} from "./account.model"

export interface TransferModel{
    trfId: string;
    trfOutcome: AccountMoldel;
    trfIncome: AccountMoldel;
    trfReason: string;
    trfDateTime: Data | number;
    trfDeletedAt?: Date | number;
    
}