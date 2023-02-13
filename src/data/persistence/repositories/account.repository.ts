import { Injectable, NotFoundException } from '@nestjs/common';
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
    console.log('index ', index);
    if (index >= 0) {
      //account.deletedAt = Date.now();
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
    console.log('soft ', soft);
    if (soft || soft === undefined) {
      console.log('entra en if reposiroty');
      this.softDelete(id);
    } else {
      console.log('entra en else reposiroty');
      this.hardDelete(id);
    }
  }

  findAll(): AccountEntity[] {
    return this.database.filter((item) => {
      console.log('item ', item);
      console.log('item ', item.deletedAt);
      return item;
    });
  }

  findOneById(id: string): AccountEntity {
    const account = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (account) return account;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByState(state: boolean): AccountEntity[] {
    const accounts = this.database.filter((item) => item.state === state);
    return accounts;
  }

  findByCustomer(customerId: string): AccountEntity[] {
    const accounts = this.database.filter(
      (item) => item.customer.id === customerId,
    );
    return accounts;
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    const accounts = this.database.filter(
      (item) => item.accountType.id === accountTypeId,
    );
    return accounts;
  }

  removeBalance(accountId: string, amount: number): void {
    const account = this.findOneById(accountId);
    if (!account) {
      throw new NotFoundException(
        `La cuenta ${account} no existe en base de datos`,
      );
    }
    if (!account.state) {
      throw new NotFoundException(`La cuenta ${account} esta desactivada`);
    }
    const newBalance = (account.balance -= Number(amount));
    const acc = {
      ...account,
      balance: newBalance,
    };
    this.update(accountId, acc);
  }

  getBalance(accountId: string): number {
    const account = this.findOneById(accountId);
    if (!account) {
      throw new NotFoundException(
        `La cuenta ${account} no existe en base de datos`,
      );
    }
    if (!account.state) {
      throw new NotFoundException(`La cuenta ${account} esta desactivada`);
    }
    return account.balance;
  }

  addBalance(accountId: string, amount: number): void {
    const account = this.findOneById(accountId);
    if (!account) {
      throw new NotFoundException(
        `La cuenta ${account} no existe en base de datos`,
      );
    }
    if (!account.state) {
      throw new NotFoundException(`La cuenta ${account} esta desactivada`);
    }
    const newBalance = (account.balance += Number(amount));
    const acc = {
      ...account,
      balance: newBalance,
    };
    this.update(accountId, acc);
  }

  private hardDelete(id: string): void {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    this.database.splice(index, 1);
  }

  private softDelete(id: string): void {
    const account = this.findOneById(id);
    console.log('acc ', account);
    //account.deletedAt = Date.now();
    //account.id = '98';
    const v: AccountEntity = {
      ...account,
    };
    v.deletedAt = Date.now();
    console.log('data soft ', this.database);
    this.update(id, v);
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
