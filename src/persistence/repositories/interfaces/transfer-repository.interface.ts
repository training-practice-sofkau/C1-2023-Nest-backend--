import { AccountEntity, TransferEntity } from 'src/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface TransferRepositoryInterface
  extends BaseRepositoryInterface<TransferEntity> {
  findByIncome(Account: AccountEntity): Array<TransferEntity>;
  findByOutcome(Account: AccountEntity): Array<TransferEntity>;
}
