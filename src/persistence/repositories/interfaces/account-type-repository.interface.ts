import { AccountTypeEntity } from 'src/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface AccountTypeRepositoryInterface
  extends BaseRepositoryInterface<AccountTypeEntity> {
  findAccountTypeByState(State: boolean): Array<AccountTypeEntity>;
}
