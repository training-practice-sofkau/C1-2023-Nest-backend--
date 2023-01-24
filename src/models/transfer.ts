/* eslint-disable prettier/prettier */
import { account } from './account';
export interface transfer {
    trfId: string;
    trfOutcome: account;
    trfIncome: string;
    trfAmount: string;
    trfReason: string;
    trfDateTime: Date | number;
    trfDelaateAt?: Date | number;

  }