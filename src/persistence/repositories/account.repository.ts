import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities/account.entity';
import { BaseRepository } from './base';
import { AccountRepositoryInterface } from './interfaces';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity>
  implements AccountRepositoryInterface
{
  register(entity: AccountEntity): AccountEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): AccountEntity {
    throw new Error('This method is not implemented');
  }

  fun(accountId: string): void {
    throw new Error('Method not implemented.');
  }
}
