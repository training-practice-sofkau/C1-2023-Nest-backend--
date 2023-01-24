/* eslint-disable prettier/prettier */
import { CustomerModel } from "./customer-model";
import { typeAccount } from "./type-account";
export interface account {
    accId: string;
    costumerId: CustomerModel ;
    typeId: typeAccount;
    balance: number;
    state: boolean;
    delateAd?: Date | number;

  }