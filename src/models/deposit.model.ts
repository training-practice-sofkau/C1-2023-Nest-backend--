import { AccountTypeModel } from './';

export interface TransferModel {
  id: string;
  account: AccountTypeModel;
  amount: number;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
