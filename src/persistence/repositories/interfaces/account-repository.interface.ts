import { BaseRepositoryInterface } from './base/base-repository.interface';
import { AccountEntity } from 'src/persistence/entities';

export interface AccountRepositoryinterface
  extends BaseRepositoryInterface<AccountEntity> {
  findAccountById(accountId: string): AccountEntity;
}
