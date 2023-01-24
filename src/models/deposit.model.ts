import { Account } from './account.model';
export interface DepositModel {
  id: string;
  accountId: Account;
  amount: number;
  date_time: Date;
  deleteAt: Date | number;
}
