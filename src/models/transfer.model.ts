import { AcountModel } from "./account.model";

export interface TransferModel {
    id : string;
    outcome : AcountModel;
    income : AcountModel;
    amount: number;
    reason: string;
    dateTime: Date | number;
    deletedAt?: Date | number;
}