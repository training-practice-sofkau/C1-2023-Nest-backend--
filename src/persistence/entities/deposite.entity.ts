import { AccountModel, DepositModel, DocumentTypeModel } from "src/models";
import { v4 as uuid } from "uuid";
import { AccountEntity } from "./account.entity";

export class DepositEntity implements DepositModel {
    id= uuid();
    account: AccountEntity;
    amount: number;
    dateTime: Date | number ;
    deletedAt?: Date | number;
} 