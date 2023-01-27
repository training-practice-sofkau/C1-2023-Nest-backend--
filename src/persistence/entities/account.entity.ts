import { v4 as uuid  } from "uuid";
import { AccountTypeModel, AccountModel, CustomerModel } from "src/models";
import { CustomerEntity } from "src/persistence/entities";
import { AccountTypeEntity } from "./account-type.entity";

export class AccountEntity implements AccountModel {
    id = uuid();
    customer: CustomerEntity;
    accountType: AccountTypeEntity;
    balance: number;
    state = true;
    deletedAt?: number | Date;   
}