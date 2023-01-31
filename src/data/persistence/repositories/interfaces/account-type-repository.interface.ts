import { AccountTypeEntity } from 'src/data/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface AccountTypeRepositoryInterface
  extends BaseRepositoryInterface<AccountTypeEntity> {
  findByState(state: boolean): Array<AccountTypeEntity>;
  findByName(name: string): Array<AccountTypeEntity>;
}
