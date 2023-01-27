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
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const index = this.database.findIndex(
      (item: AccountTypeEntity) => item.id === id,
    );
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
    const item = this.database.find((d: AccountTypeEntity) => d.id === id);
    if (item) return item;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByState(state: boolean): AccountTypeEntity[] {
    const accountType = this.database.filter((item) => item.state === state);
    return accountType;
  }

  findByName(name: string): AccountTypeEntity[] {
    const accountType = this.database.filter((item) => item.name === name);
    return accountType;
  }
}

/*const dataAccountType: AccountTypeEntity[] = [
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

function findByState(state: boolean): AccountTypeEntity[] {
  const accountType = dataAccountType.filter(
    (item: AccountTypeEntity) => item.state === state,
  );
  if (accountType) return accountType;
  else throw new NotFoundException(`El ID ${state} no existe en base de datos`);
}
function findByName(name: string): AccountTypeEntity[] {
  const accountType = dataAccountType.filter(
    (item: AccountTypeEntity) => item.name === name,
  );
  if (accountType) return accountType;
  else throw new NotFoundException(`El ID ${name} no existe en base de datos`);
}

console.log('FIND BY STATE ', findByState(false));
console.log('FIND BY NAME ', findByName('corriente1'));*/
