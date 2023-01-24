/* eslint-disable prettier/prettier */
import { account } from 'src/models/account';
import { v4 as uuid } from 'uuid';

import { transfer } from '../../models/transfer';

export class transferEntity implements transfer {
    id = uuid();
    trfId: string;
    trfOutcome: account;
    trfIncome: string;
    trfAmount: string;
    trfReason: string;
    trfDateTime: number | Date;
    trfDelaateAt?: number | Date | undefined;
    
    
}