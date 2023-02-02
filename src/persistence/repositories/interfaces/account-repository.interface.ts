import { BaseRepositoryInterface } from './base/';
import { AccountEntity } from '../../entities';

export interface AccountRepositoryInterface
  extends BaseRepositoryInterface<AccountEntity> {
  findByState(state: boolean): AccountEntity[];
  findByCustomer(customerId: string): AccountEntity[];
  findByAccountType(accountTypeId: string): AccountEntity[];
}
