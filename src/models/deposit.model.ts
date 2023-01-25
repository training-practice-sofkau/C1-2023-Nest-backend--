import { AccountModel } from "./account.model";
export interface DepositModel {
  id: string;
  accountId: AccountModel;
  amount: number;
  date_time: Date | number;
  deleteAt: Date | number;
}
