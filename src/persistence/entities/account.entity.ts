import { v4 as uuid } from 'uuid';
import { AccountTypeEntity, CustomerEntity } from './';
import { AccountModel } from 'src/models';

export class AccountEntity implements AccountModel {
  id = uuid();
  customer: CustomerEntity;
  accountType: AccountTypeEntity;
  balance: number;
  state = true;
  deletedAt?: Date | number;
}
