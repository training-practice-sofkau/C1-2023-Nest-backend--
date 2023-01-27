import { Injectable } from '@nestjs/common';
import { AccountTypeEntity } from '../entities/account-type.entity';
import { AccountEntity } from '../entities/account.entity';
import { BaseRepository } from './base/base.repository';
import { AccountTypeRepositoryInterface } from './interfaces/account-repository.interface';

@Injectable()
export class AccountTypeRepository extends BaseRepository<AccountTypeEntity> implements AccountTypeRepositoryInterface {
 
  register(entity: AccountEntity): AccountEntity {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  findByCustomer(customerId: string): AccountEntity[] {
    throw new Error('Method not implemented.');
  }
  findByAccountType(accountTypeId: string): AccountEntity[] {
    throw new Error('Method not implemented.');
  }
  }
