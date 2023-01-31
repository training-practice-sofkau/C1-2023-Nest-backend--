import { AccountModel } from 'src/data/models/account.model';
import { TransferModel } from 'src/data/models/transfer.model';
import { v4 as uuid } from 'uuid';
export class TransferEntity implements TransferModel {
  id = uuid();
  outcome: AccountModel;
  income: AccountModel;
  amount: string;
  reason: string;
  date_time: number | Date;
  deleteAt?: number | Date;
}
