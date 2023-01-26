import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base/base.repository';
import { AccountTypeEntity } from '../entities';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements BaseRepositoryInterface<AccountTypeEntity>
{
  index: number;
  data: AccountTypeEntity;
  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    this.index = this.database.findIndex((item) => item.id === id);
    this.data = this.database[this.index];
    this.database[this.index] = {
      ...this.data,
      ...entity,
      id: id,
    };
    return this.database[this.index];
  }

  delete(id: string, soft?: boolean): void {
    this.index = this.database.findIndex((item) => item.id === id);
    if (soft === true) {
      const data = this.database[this.index];
      data.state = false;
      this.database[this.index] = {
        ...data,
      };
    } else {
      delete this.database[this.index];
    }
  }
  findAll(): AccountTypeEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(): AccountTypeEntity {
    throw new Error('Method not implemented.');
  }
  findByState(/*state: boolean*/): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findByName(/*name: string*/): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }
}
