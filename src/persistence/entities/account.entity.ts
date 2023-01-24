import { v4 as uuid } from 'uuid';
import { AccountModel } from '../../models';
import { AccountTypeEntity } from './account-type.entity';
import { CustomerEntity } from './customer.entity';

export class AccountEntity implements AccountModel {
  id = uuid();

  customer: CustomerEntity;

  accountType: AccountTypeEntity;

  balance: number;

  state: string;

  deletedAt?: Date | number;
}
