import { AccountModel, DepositModel } from "src/models";
import { v4 as uuid } from 'uuid';
import { AccountEntity } from "./";

export class DepositEntity implements DepositModel {
    id = uuid();
    account: AccountEntity;
    amount = 0;
    dateTime: number | Date;
    deletedAt?: number | Date | undefined;
}