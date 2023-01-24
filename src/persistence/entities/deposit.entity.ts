import { v4 as uuid } from 'uuid';
import { DepositModel } from 'src/models/deposit.model';
import { AccountEntity } from './account.entity';

export class DepositEntity implements DepositModel {
  id = uuid();

  account: AccountEntity;

  amount: number;

  dateTime: Date | number;

  deletedAt?: Date | number;
}
