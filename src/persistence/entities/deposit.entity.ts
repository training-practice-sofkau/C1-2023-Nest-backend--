import { AccountModel } from 'src/models';
import { v4 as uuid } from 'uuid';
import { DepositModuls } from '../../models/deposit.module';

export class DepositEntity implements DepositModuls {
  id = uuid();
  accountId: AccountModel;
  amount: number;
  dateTime: number | Date;
  deletedAt?: number | Date;
}
