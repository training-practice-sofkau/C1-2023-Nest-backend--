import { Injectable } from '@nestjs/common';
import { AccountTypeEntity } from '../entities/account-type.entity';
import { BaseRepository } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';
@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  register(entity: AccountTypeEntity): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }
  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): AccountTypeEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): AccountTypeEntity {
    throw new Error('Method not implemented.');
  }

  fun(accountId: string): void {
    throw new Error('Method not implemented.');
  }
}
