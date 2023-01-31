import { AccountEntity } from 'src/data/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface AccountRepositoryInterface
  extends BaseRepositoryInterface<AccountEntity> {
  findByState(state: boolean): Array<AccountEntity>;
  findByCustomer(customerId: string): AccountEntity[];
  findByAccountType(accountTypeId: string): AccountEntity[];
}
