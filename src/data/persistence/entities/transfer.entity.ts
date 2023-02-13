import { v4 as uuid } from 'uuid';
import { AccountEntity } from '.';
import { TransferModel } from '../../models';

export class TransferEntity implements TransferModel {
  id = uuid();

  outcome: AccountEntity;

  income: AccountEntity;

  amount: number;

  reason: string;

  dateTime: number | Date;

  deletedAt?: number | Date | undefined;
}
