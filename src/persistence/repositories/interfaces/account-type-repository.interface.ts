import { BaseRepositoryInterface } from './base';
import { AccountTypeEntity } from '../../entities';

export interface AccountTypeRepositoryInterface
  extends BaseRepositoryInterface<AccountTypeEntity> {
  fun(accountId: string): void; // una funcion unica para la cuenta
}
