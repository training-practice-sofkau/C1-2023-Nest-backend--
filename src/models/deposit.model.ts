import { AcountModel } from "./account.model";

export interface DepositModel {
    id : string;
    account : AcountModel;
    amount : number;
    dateTime : Date
    deletedAt?: Date | number;
}