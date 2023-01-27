import { BaseRepositoryInterface } from './base/base-repository.interface';
import { CustomerEntity } from 'src/persistence/entities';

export type CustomerRepositoryInterface =
  BaseRepositoryInterface<CustomerEntity>;
{
}
