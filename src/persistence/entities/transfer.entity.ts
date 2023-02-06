import { AccountModel, TransferModel } from 'src/models';
import { v4 as uuid } from 'uuid';
export class TransferEntity implements TransferModel {
  id = uuid();
  outcome: AccountModel;
  income: AccountModel;
  amount: number;
  reason: string;
  dateTime: number | Date;
  deletedAt?: number | Date;
}
