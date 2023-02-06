import { TransferModel } from 'src/business/models';
import { v4 as uuid } from 'uuid';
import { AccountEntity } from "./";

export class TransferEntity implements TransferModel {
    id = uuid();
    outcome: AccountEntity;
    income: AccountEntity;
    amount = 0;
    reason: string;
    dateTime: number | Date;
    deletedAt?: number | Date | undefined;

}