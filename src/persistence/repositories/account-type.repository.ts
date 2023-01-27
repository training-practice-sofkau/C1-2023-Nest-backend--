import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountTypeEntity } from '../entities/account-type.entity';
import { BaseRepository } from './base/base.repository';
import { AccountTypeRepositoryInterface } from './interfaces/account-type-repository.interface';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
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

  delete(id: string, soft?: boolean): void {
    const account = this.findOneById(id);
    if (soft || soft === undefined) {
      this.update(id, account);
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
    const status = this.database.filter((item) => item.state == state);
    return status;
  }

  findByName(name: string): AccountTypeEntity[] {
    const firsname = this.database.filter((item) => item.name == name);
    return firsname;
  }
}
