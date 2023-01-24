import { AccountModel } from './';

export interface DepositModel {
  id: string;
  account: AccountModel;
  amount: number;
  dateTime: Date | string;
  deletedAt?: Date | string;
}
