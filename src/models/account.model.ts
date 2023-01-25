import { CustomerModel } from './customer.model';
import { AccountTypeModel } from './account-type.model';

export interface AccountModel {
  id: string;
  customerId: CustomerModel;
  typeId: AccountTypeModel;
  balance: number;
  state: boolean;
  delatedAd?: Date | number;
}
