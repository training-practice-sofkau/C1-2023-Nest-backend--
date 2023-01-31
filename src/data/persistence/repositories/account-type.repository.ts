import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountTypeEntity } from '../../data/persistence/entities';
import { BaseRepository } from './base/base.repository';
import { AccountTypeRepositoryInterface } from './interfaces/account-type-repository.interface';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
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
    const AccountT = this.findOneById(id);
    if (soft || soft === undefined) {
      this.update(id, AccountT);
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      this.database.splice(index, 1);
    }
  }

  findAll(): AccountTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): AccountTypeEntity {
    const account = this.database.find((item) => item.id === id);
    if (account) return account;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByState(state: boolean): AccountTypeEntity[] {
    const statuA = this.database.filter((item) => item.state == state);
    return statuA;
  }

  findByName(name: string): AccountTypeEntity[] {
    const nameA = this.database.filter((item) => item.name == name);
    return nameA;
  }
}
