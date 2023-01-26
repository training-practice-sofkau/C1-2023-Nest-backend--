import { Injectable } from '@nestjs/common';
import { CustomerEntity as AccountEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { CustomerRepositoryInterface as AccountRepositoryInterface } from './interfaces/customer.repository.interface';

@Injectable()
export class AccountRepository extends BaseRepository<AccountEntity> implements AccountRepositoryInterface {
  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: AccountEntity): AccountEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): AccountEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): AccountEntity {
    throw new Error('Method not implemented.');
  }
  findByState(state: boolean): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findByCustomer(customerId: string): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    throw new Error('This method is not implemented');
  }
}