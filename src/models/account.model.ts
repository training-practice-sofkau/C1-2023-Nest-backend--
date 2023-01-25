import { AccountTypeModel } from './account-type.model';
import { CustomerModel } from './customer.model';

export interface AccountModel {
  id: string;
  custumer: CustomerModel;
  accountType: AccountTypeModel;
  balance: number;
  state: boolean;
  deletedAt?: Date | number;
}
