import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { BaseRepository } from './base';
import { AccountRepositoryInterface } from './interfaces';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity>
  implements AccountRepositoryInterface
{
  constructor() {
    super();
  }
  findByAccountByAccountType(accountType: string): AccountEntity[] {
    throw new Error('Method not implemented.');
  }
  register(entity: AccountEntity): AccountEntity {
    throw new Error('Method not implemented.');
  }
  upate(id: string, entity: AccountEntity): AccountEntity {
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
}
