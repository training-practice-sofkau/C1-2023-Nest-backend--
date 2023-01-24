/* eslint-disable prettier/prettier */
import { typeAccount } from './type-account';
export interface deposit{
    depId: string;
    accountId: typeAccount;
    depAmount: boolean;
    depDateTime: Date | number;
    depDeletedAt?: Date | number;


  }
