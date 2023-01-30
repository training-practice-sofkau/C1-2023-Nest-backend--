import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountTypeEntity as AccountTypeEntity } from '../entities';
import { BaseRepository } from './base/';
import { AccountTypeRepositoryInterface } from './interfaces/';
@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  constructor() {
    super();
    this.database.push({
      id: 'ab27c9ac-a01c-4c22-a6d6-ce5ab3b79185',
      name: 'Cuenta de ahorrros',
      state: true,
    });
    this.database.push({
      id: '10b6c590-85fa-4621-b85a-4021e882c080',
      name: 'Cuenta corriente',
      state: true,
    });
  }

  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const index = this.database.findIndex((item) => item.id === id);
    const data = this.database[index];
    if (index >= 0) {
      this.database[index] = {
        ...data,
        ...entity,
        id,
      } as AccountTypeEntity;
    } else {
      throw new NotFoundException(`El Id: ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    const index = this.database.findIndex((item) => item.id === id);
    this.database.splice(index, 1);
  }

  findAll(): AccountTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): AccountTypeEntity {
    const index = this.database.findIndex((item) => item.id === id);
    if (index >= 0) {
      return this.database[index];
    } else {
      throw new NotFoundException(`El Id: ${id} no existe en base de datos`);
    }
  }

  findByState(state: boolean): AccountTypeEntity[] {
    return this.database.filter((item) => item.state === state);
  }

  findByName(name: string): AccountTypeEntity[] {
    return this.database.filter((item) => item.name === name);
  }
}
