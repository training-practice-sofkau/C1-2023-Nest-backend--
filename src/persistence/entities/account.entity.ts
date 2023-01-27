import { AccountModel, AccountTypeModel, CustomerModel } from "../../models";
import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountModel{
    id= uuid();
    customer_id: CustomerModel;
    acount_type_id: AccountTypeModel;
    balance = 0;
    state = true;
    deleted_at: number | Date;

}