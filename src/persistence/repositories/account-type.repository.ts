import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements BaseRepositoryInterface<AccountTypeEntity>
{
  index: number;
  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity); //push enviamos informacion
    return this.database.at(-1) ?? entity; //retornamos la ultima posicion y de ser algo contrario retormos la ultima entity
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const index = this.database.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as AccountTypeEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    this.index = this.database.findIndex((item) => item.id === id);
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
