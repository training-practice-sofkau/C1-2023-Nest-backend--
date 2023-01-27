import { AccountModel } from "./";

export interface DepositModel {
    id: string;
    accountId: AccountModel;
    amount: number;
    dateTime: Date | number;
    deletedAt?: Date | number
}