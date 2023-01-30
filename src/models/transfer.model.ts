<<<<<<< HEAD
import { AccountModel } from './';

export interface TransferModel {
  id: string;
  outcome: AccountModel;
  income: AccountModel;
=======
export interface TransferModel {
  id: string;
  outcome: string;
  income: string;
>>>>>>> 3b3ea44
  amount: number;
  reason: string;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
