import { BaseRepositoryInterface } from './base';
import { CustomerEntity } from '../../entities';

export interface CustomerRepositoryInterface
  extends BaseRepositoryInterface<CustomerEntity> {
  fun(accountId: string): void; // una funcion unica para la cuenta
}
