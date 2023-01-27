import { v4 as uuid } from 'uuid';
import { DepositModel } from 'src/models/deposit.model';
import { Account } from '../../models/account.model';

export class DepositEntity implements DepositModel {
  idDep: string;
  id = uuid();
  accountId: Account;
  amount: number;
  date_time: Date;
  deleteAt: number | Date;
}
