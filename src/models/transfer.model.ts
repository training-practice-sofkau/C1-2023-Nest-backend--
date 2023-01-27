import { AccountModel } from './account.model';

export interface TransferModel {
  id: string;
  outCome: AccountModel;
  inCome: AccountModel;
  amount: string;
  reason: string;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
