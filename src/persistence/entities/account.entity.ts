import { AccountModel } from 'src/models/account.model';
import { AccountTypeModel } from 'src/models/account-type.model';
import { CustomerModel } from 'src/models';
import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountModel {
  id = uuid();
  customer: CustomerModel;
  accountType: AccountTypeModel;
  balance: number;
  state: boolean;
  delatedAt?: number | Date;
}
