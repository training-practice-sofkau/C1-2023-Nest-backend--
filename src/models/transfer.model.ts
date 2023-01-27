import { AccountModel } from './';

export interface TransferModel {
  id: string;
  outCome: AccountModel;
  inCome: AccountModel;
  amount: number;
  reason: string;
  dateTime: Date | string;
  deletedAt?: Date | string;
}
