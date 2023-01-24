import { v4 as uuid  } from "uuid";
import { AccountTypeModel, AcountModel, CustomerModel } from "src/models";
import { AccountTypeEntity } from "./acount-type.entity";
import { CustomerEntity } from "src/persistence/entities";

export class AccountEntity implements AcountModel {
    id = uuid();
    customer: CustomerEntity;
    accountType: AccountTypeEntity;
    balance: number;
    state = true;
    deletedAt?: number | Date;   
}