import { AccountModel, CustomerModel } from 'src/models';
import { v4 as uuid } from 'uuid';
import { AccountTypeModel } from 'src/models';

export class AccountEntity implements AccountModel {
  name: string;
  id = uuid();
  customer: CustomerModel;
  acountType: AccountTypeModel;
  balance: number;
  state = true;
  deletedAt?: number | Date;
}
function uuid() {
  throw new Error('Function not implemented.');
}
