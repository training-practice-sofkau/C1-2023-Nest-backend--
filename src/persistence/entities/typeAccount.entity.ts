/* eslint-disable prettier/prettier */
import { v4 as uuid } from 'uuid';
import { typeAccount } from '../../models/type-account';

export class typeAccountEntity implements typeAccount {
    acctypeId: string;
    acctypeName: string;
    acctypeEtate: boolean;
    id = uuid();
    

}