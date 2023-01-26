import { AccountEntity, TransferEntity } from 'src/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface TransferRepositoryInterface
  extends BaseRepositoryInterface<TransferEntity> {
  findByIncome(account: AccountEntity): Array<TransferEntity>;
  findByOutcome(account: AccountEntity): Array<TransferEntity>;
}
