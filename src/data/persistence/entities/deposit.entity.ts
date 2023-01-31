import { v4 as uuid } from 'uuid';
import { AccountEntity } from './';
import { DepositModel } from '../../models';

export class DepositEntity implements DepositModel {
  id = uuid();

  amount = 0;

  account: AccountEntity;

  dateTime: number | Date;

  deletedAt?: number | Date;
}
