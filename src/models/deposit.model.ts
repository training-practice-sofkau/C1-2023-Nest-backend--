import { AccountModel } from "./";

export interface DepositModel {
    id: string;
    account_id: AccountModel;
    amount: number;
    dateTime: Date | number;
    deletedAt?: Date | number
}