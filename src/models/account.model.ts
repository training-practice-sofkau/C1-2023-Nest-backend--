import { CustomerModel } from './';
import { AccountTypeModel } from './';

export interface AccountModel {
  id: string;
  customer: CustomerModel;
  acountType: AccountTypeModel;
  balance: number;
  state: boolean;
  deletedAt?: Date | string;
}
