import { CustomerModel } from "../models";
export interface AccountModel {
    id: string;
    customer_id: CustomerModel;
    acount_type_id: AccountModel;
    balance:number;
    state:boolean;
    deleted_at: Date | number;

}