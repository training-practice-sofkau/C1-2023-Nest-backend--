import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities/account.entity';
import { BaseRepository } from './base/base.repository';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity>
  implements BaseRepositoryInterface<AccountEntity>
{
  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
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
}
