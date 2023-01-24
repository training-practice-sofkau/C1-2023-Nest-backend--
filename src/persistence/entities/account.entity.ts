/* eslint-disable prettier/prettier */
import { v4 as uuid } from 'uuid';
import { account } from 'src/models/account';
import { typeAccount } from 'src/models/type-account';
import { CustomerEntity } from './customer.entity';

export class AccountEntity implements account {
    accId: string;
    costumerId: CustomerEntity;
    typeId: typeAccount;
    balance: number;
    state: boolean;
    delateAd?: number | Date | undefined;
    id = uuid();
    

 
}
