/* eslint-disable prettier/prettier */
import { typeAccount } from 'src/models/type-account';
import { v4 as uuid } from 'uuid';

import { deposit } from '../../models/deposit';

export class DespositEntity implements deposit {
    id = uuid();
    depId: string;
    accountId: typeAccount;
    depAmount: boolean;
    depDateTime: number | Date;
    depDeletedAt?: number | Date | undefined;

    

 
}