import { v4 as uuid } from 'uuid';
import { DepositModel } from 'src/models';
import { AccountEntity } from '.';

export class DepositEntity implements DepositModel {
  id = uuid();
  account: AccountEntity;
  amount: number;
  dateTime: string | Date;
  deletedAt?: string | Date;
}
