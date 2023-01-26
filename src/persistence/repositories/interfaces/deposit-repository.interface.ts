import { AccountEntity, DepositEntity } from 'src/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface DepositREpositoryInterface
  extends BaseRepositoryInterface<DepositEntity> {
  findByAccount(account: AccountEntity): Array<DepositEntity>;
}
