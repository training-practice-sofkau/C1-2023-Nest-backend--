import { AccountTypeModel, CustomerModel } from './';

export interface AccountModel {
  id: string;
  customer: CustomerModel;
  accountType: AccountTypeModel;
  balance: number;
  state: string;
  deletedAt?: Date | number;
}
