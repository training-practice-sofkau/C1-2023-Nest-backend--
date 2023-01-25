import { AccountModel } from './';
export interface TranfersModel {
  id: string;
  outcome: AccountModel;
  income: AccountModel;
  amount: number;
  reason: string;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
