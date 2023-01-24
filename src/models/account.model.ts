import { CustomerModel } from "./";
import { AccountTypeModel } from "./account-type.model";

export interface AccountModel {
    id: string;
    customerId: CustomerModel;
    accountType: AccountTypeModel;
    balance: number;
    state: boolean;
    deletedAt?: Date | number;
}