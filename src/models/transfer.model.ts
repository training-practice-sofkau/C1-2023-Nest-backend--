import { AccountTypeModel } from './';

export interface TransferModel {
  id: string;
  outCome: AccountTypeModel;
  inCome: AccountTypeModel;
  amount: number;
  reason: string;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
