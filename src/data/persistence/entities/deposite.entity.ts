import { AccountModel, DepositModel, DocumentTypeModel } from "src/data/models";
import { v4 as uuid } from "uuid";
import { AccountEntity } from "./account.entity";

export class DepositEntity implements DepositModel {
    id = uuid();
    account: AccountModel;
    amount: number;
    dateTime: number | Date;
    deletedAt?: number | Date;     
     
} 