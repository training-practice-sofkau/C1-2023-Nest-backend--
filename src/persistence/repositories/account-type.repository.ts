import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountTypeEntity } from '../entities/account-type.entity';
import { BaseRepository } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';
@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  register(entity: AccountTypeEntity): AccountTypeEntity {
    //this.database = [...entity, this.database];
    //this.database.push(entity);
    console.log('DATABASE', this.database);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const index = this.database.findIndex(
      (item: AccountTypeEntity) => item.id === id,
    );
    this.database.splice(index, 1, entity);
    return entity;
  }

  delete(id: string, soft?: boolean | undefined): void {
    const index = this.database.findIndex(
      (item: AccountTypeEntity) => item.id === id,
    );
    this.database.splice(index, 1);
  }

  findAll(): AccountTypeEntity[] {
    return this.database;
  }
  findOneById(id: string): AccountTypeEntity {
    const item = dataAccountType.find((d: AccountTypeEntity) => d.id === id);
    const i = {
      id: '',
      name: '',
      state: false,
    };

    return item ?? i;
  }

  findByState(state: boolean): AccountTypeEntity[] {
    throw new Error('Method not implemented.');
  }
  findByName(name: string): AccountTypeEntity[] {
    throw new Error('Method not implemented.');
  }
}

const dataAccountType: AccountTypeEntity[] = [
  {
    id: '1',
    name: 'corriente1',
    state: true,
  },
  {
    id: '2',
    name: 'corriente2',
    state: true,
  },
];

function register(item: AccountTypeEntity): AccountTypeEntity {
  dataAccountType.push(item);
  //dataAccountType = [...dataAccountType, item];
  return dataAccountType.at(-1) ?? item;
}
const newAccountType: AccountTypeEntity = {
  id: '3',
  name: 'corriente3',
  state: true,
};
console.log('REGISTER ', register(newAccountType));
console.log('find all ', findAll(), '\n');

function update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
  const index = dataAccountType.findIndex(
    (item: AccountTypeEntity) => item.id === id,
  );
  dataAccountType.splice(index, 1, entity);
  return entity;
}

const updateAccountType: AccountTypeEntity = {
  id: '80',
  name: 'corriente1',
  state: true,
};
console.log('UPDATE ', update('1', updateAccountType));
console.log('data ', dataAccountType);
//console.log('find all \n', findAll(), '\n');

function deletee(id: string, soft?: boolean | undefined): void {
  //dataAccountType = dataAccountType.filter(
  //(d: AccountTypeEntity) => d.id != id,
  //);
  const index = dataAccountType.findIndex(
    (item: AccountTypeEntity) => item.id === id,
  );
  dataAccountType.splice(index, 1);
}
console.log('DELETE');
deletee('2');
console.log('find all \n', findAll(), '\n');

function findOneById(id: string): AccountTypeEntity | boolean {
  const item = dataAccountType.find((d: AccountTypeEntity) => d.id === id);
  if (!item) return false;
  return item;
}

console.log('FIND BY ID', findOneById('80'));

function findAll(): AccountTypeEntity[] {
  return dataAccountType;
}
console.log('find all ', findAll(), '\n');
