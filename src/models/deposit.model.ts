import { AcountModel } from "./account.model";

interface DepositeModel {
    id : string;
    account : AcountModel;
    amount : number;
    dateTime : Date
    deletedAt?: Date | number;
}