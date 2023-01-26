import { Injectable } from '@nestjs/common';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';
import { AccountTypeEntity } from '../entities/account-type.entity';
import { BaseRepository } from './base/base.repository';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements BaseRepositoryInterface<AccountTypeEntity>
{
  index: number;
  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity); //enviamos informacon a la base
    return this.database.at(-1) ?? entity; //retornamos la ultima posicion del areglo
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const index = this.database.findIndex((item) => item.id === id);
    const data = this.database[index];
    this.database[index] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[index];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const index = this.database.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new Error('This method is not implemented');
    }
    this.database.splice(index, 1);
  }

  findAll(): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }
  findByState(state: boolean): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findByName(name: string): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }
}
