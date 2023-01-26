import { AccountEntity } from 'src/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface AccountRepositoryInterface
  extends BaseRepositoryInterface<AccountEntity> {
  findByAccountByAccountType(accountType: string): Array<AccountEntity>;
}
