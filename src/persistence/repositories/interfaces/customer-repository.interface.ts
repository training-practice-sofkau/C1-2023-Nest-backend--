import { CustomerEntity } from 'src/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface CustomerRepositoryInterface
  extends BaseRepositoryInterface<CustomerEntity> {
  fingByEmail(email: string): Array<CustomerEntity>;
}
