import { v4 as uuid } from 'uuid';
import { AccountEntity } from './';
import { TransferModel } from '../../models';

export class TransferEntity implements TransferModel {
  id = uuid();

  outCome: AccountEntity;

  inCome: AccountEntity;

  amount = 0;

  reason: string;

  dateTime: number | Date;

  deletedAt?: number | Date;
}
