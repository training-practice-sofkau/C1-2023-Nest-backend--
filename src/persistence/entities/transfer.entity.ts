import { Account } from 'src/models/account.model';
import { v4 as uuid } from 'uuid';
import { TransferModel } from 'src/models/transfer.model';

export class TransferEntity implements TransferModel {
  id: string;
  outcome: Account;
  income: Account;
  amount: number;
  reason: string;
  date_time: Date;
  deleteAt: number | Date;
}
