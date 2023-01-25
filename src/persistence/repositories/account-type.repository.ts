import { Injectable } from '@nestjs/common';
import { AccountTypeEntity as AccountTypeEntity } from '../entities';
import { BaseRepository } from './base/';
import { BaseRepositoryInterface } from './interfaces/';

@Injectable()
export class CustomerRepository
  extends BaseRepository<AccountTypeEntity>
  implements BaseRepositoryInterface<AccountTypeEntity>
{
  register(entity: AccountTypeEntity): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }
}
