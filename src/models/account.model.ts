import { AccountTypeModel } from "./account-type.model";
import { CustomerModel } from "./customer.model";

export interface AcountModel {
    id : string;
    customer : CustomerModel;
    accountType : AccountTypeModel;
    balance : number;
    state : boolean;
    deletedAt?: Date | number; 

}