import { v4 as uuid  } from "uuid";
import { AccountModel } from "src/models";
import { CustomerEntity } from "src/persistence/entities";
import { AccountTypeEntity } from "./account-type.entity";

export class AccountEntity implements AccountModel {
    id = uuid();
    customer: CustomerEntity;
    accountType: AccountTypeEntity;
    balance: number;
    state = true;
    deletedAt?: number | Date;   
  document: string;
  email: string;
  phone: string;
  fullName: any;
}