import { BaseRepositoryInterface } from './base';
import { AccountEntity } from '../../entities';

export interface AccountRepositoryInterface
  extends BaseRepositoryInterface<AccountEntity> {
  fun(accountId: string): void; // una funcion unica para la cuenta
}
