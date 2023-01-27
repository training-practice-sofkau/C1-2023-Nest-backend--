import { Account } from './account.model';

export interface TransferModel {
  id: string;
  outcome: Account;
  income: Account;
  amount: number;
  reason: string;
  date_time: Date;
  deleteAt: Date | number;
}
