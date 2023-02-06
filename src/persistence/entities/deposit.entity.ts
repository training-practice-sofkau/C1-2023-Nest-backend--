import { AccountModel } from 'src/models';
import { v4 as uuid } from 'uuid';
import { DepositModel } from 'src/models/deposit.model';

export class DepositEntity implements DepositModel {
  id = uuid();
  account: AccountModel;
  amount: number;
  dateTime: number | Date;
  deletedAt?: number | Date;
}
