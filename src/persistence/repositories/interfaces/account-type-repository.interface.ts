import { AccountTypeEntity } from 'src/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface AccountTypeRepositoryInterface
  extends BaseRepositoryInterface<AccountTypeEntity> {
  findByState(state: boolean): Array<AccountTypeEntity>;
  findByName(name: string): Array<AccountTypeEntity>;
}
