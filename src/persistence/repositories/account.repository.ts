import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { BaseRepository } from './base/';
import { BaseRepositoryInterface } from './interfaces/';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity>
  implements BaseRepositoryInterface<AccountEntity>
{
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
}
