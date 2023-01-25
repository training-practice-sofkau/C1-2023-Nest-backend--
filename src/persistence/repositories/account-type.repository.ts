import { Injectable } from '@nestjs/common';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';
import { AccountTypeEntity } from '../entities/account-type.entity';
import { BaseRepository } from './base/base.repository';

@Injectable()
export class TypeAccountRepository
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
