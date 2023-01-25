import { AccountModel } from './account.model';
export interface DepositModuls {
  id: string;
  accountId: AccountModel;
  amount: number;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
