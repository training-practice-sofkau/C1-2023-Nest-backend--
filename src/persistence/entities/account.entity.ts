import { v4 as uuid } from 'uuid';
import { AccountModel } from '../../models/account.model';
import { CustomerModel } from 'src/models';
import { AccountTypeModel } from '../../models/account-type.model';

export class AccountEntity implements AccountModel {
  [x: string]: AccountEntity;
  [x: string]: AccountEntity;
  id = uuid();
  customer: CustomerModel;
  accountType: AccountTypeModel;
  balance: number;
  state = true;
  deletedAt?: number | Date;
  customerId: string;
}
