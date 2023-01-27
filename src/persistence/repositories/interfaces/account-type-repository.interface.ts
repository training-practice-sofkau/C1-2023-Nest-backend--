import { BaseRepositoryInterface } from './base/';
import { AccountTypeEntity } from '../../entities';

export interface AccountTypeRepositoryInterface
  extends BaseRepositoryInterface<AccountTypeEntity> {
  findByState(state: boolean): AccountTypeEntity[];
  findByName(name: string): AccountTypeEntity[];
}
