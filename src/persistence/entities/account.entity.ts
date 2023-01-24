import { v4 as uuid } from 'uuid';
import { AccountTypeEntity } from '.';
import { CustomerEntity } from '.';
import { AccountModel } from '../../models';

export class AccountEntity implements AccountModel {
  id = uuid();

  customer: CustomerEntity;

  accountType: AccountTypeEntity;

  balance = 0;

  state = true;

  deletedAt?: Date | number;
}
