import { AccountModel } from 'src/business/models';
import { v4 as uuid } from 'uuid';
import { AccountTypeEntity, CustomerEntity } from ".";

export class AccountEntity implements AccountModel {
    id = uuid();
    customer: CustomerEntity;
    accountType: AccountTypeEntity;
    balance = 0;
    state = true;
    deletedAt?: number | Date;
}