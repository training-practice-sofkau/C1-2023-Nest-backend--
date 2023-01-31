import { AccountModel } from 'src/data/models';
import { v4 as uuid } from 'uuid';
import { DepositModel } from '../../models/deposit.model';

export class DepositEntity implements DepositModel {
  id = uuid();
  account: AccountModel;
  amount: number;
  dateTime: number | Date;
  deletedAt?: number | Date;
}
