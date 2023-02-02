import { AccountModel } from "./account.model";

export interface DepositModel {
    id : string;
    account : AccountModel;
    amount : number;
    dateTime : number | Date
    deletedAt?: Date | number;
}