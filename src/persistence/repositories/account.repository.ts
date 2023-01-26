import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { AccountEntity } from '../entities/account.entity';
import { BaseRepository } from './base';
import { AccountRepositoryInterface } from './interfaces';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity>
  implements AccountRepositoryInterface
{
  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as AccountEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    const account = this.findOneById(id);
    if (soft || soft === undefined) {
      account.deletedAt = Date.now();
      this.update(id, account);
    } else {
      const index = this.database.findIndex(
        (item) => item.id === id && (item.deletedAt ?? true) === true,
      );
      this.database.splice(index, 1);
    }
  }

  findAll(): AccountEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }

  findOneById(id: string): AccountEntity {
    const account = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (account) return account;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByState(state: boolean): AccountEntity[] {
    throw new Error('Method not implemented.');
  }
  findByCustomer(customerId: string): AccountEntity[] {
    throw new Error('Method not implemented.');
  }
  findByAccountType(accountTypeId: string): AccountEntity[] {
    throw new Error('Method not implemented.');
  }
  private hardDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  private softDelete(index: number): void {
    throw new Error('This method is not implemented');
  }
}

/*const dataAccountType: any[] = [
  {
    id: '1',
    name: 'corriente1',
    state: true,
    deletedAt: undefined,
  },
  {
    id: '2',
    name: 'corriente2',
    state: true,
    deletedAt: 789,
  },
];

function update(id: string, entity: any): any {
  const index = dataAccountType.findIndex((item: AccountEntity) => {
    item.id === id && (item.deletedAt ?? true) === true;
  });
  if (index >= 0) {
    dataAccountType[index] = {
      ...dataAccountType[index],
      ...entity,
      id,
    } as any;
  } else {
    console.log(`El ID ${id} no existe en base de datos`);
    //throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }
  return dataAccountType[index];
}

const u: any = {
  id: '1',
  name: 'UPDATE',
  state: true,
  //deletedAt: undefined,
};

//console.log(update('2', u));
console.log('data ', dataAccountType);
//console.log(false === true);

function deletee(id: string, soft?: boolean): void {
  const item = findOneById(id);
  console.log('soft ', soft);
  console.log('soft ', soft || soft);
  console.log('soft ', soft || soft === undefined); //undefined === undefined, si no le paso nada de soft
  //true === undefined, si le paso un true
  if (soft || soft === undefined) {
    console.log('entra en if');
    item.deletedAt = Date.now();
    update(id, item);
  } else {
    console.log('entra en else');
    const index = dataAccountType.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    dataAccountType.splice(index, 1);
  }
  console.log('data ', dataAccountType);
}

function findOneById(id: string): any {
  const customer = dataAccountType.find(
    (item: any) => item.id === id && (item.deletedAt ?? true) === true,
  );
  if (customer) return customer;
  else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
}

deletee('1', true);*/
