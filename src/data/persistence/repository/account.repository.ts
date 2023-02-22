import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { AccountRepositoryInterface } from './interfaces/account-repository.interface';

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
    if (soft || soft === undefined) {
      const index = this.database.findIndex((item) => item.id === id);
      this.softDelete(index);
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      this.hardDelete(index);
    }
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }
  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }

  findAll(): AccountEntity[] {
    return this.database;
  }

  findOneById(id: string): AccountEntity {
    const account = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (account) return account;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByState(state: boolean): AccountEntity[] {
    const estado = this.database.filter(
      (item) => item.state == state && typeof item.deletedAt === 'undefined',
    );
    return estado;
  }

  findByCustomer(customer: string): AccountEntity[] {
    console.log(customer)
    const client = this.database.filter(
      (item) =>
        item.customer.id == customer && typeof item.deletedAt === 'undefined',
    );
    return client;
  }

  findByAccountType(accountType: string): AccountEntity[] {
    const accountTy = this.database.filter(
      (item) =>
        item.accountType.id == accountType &&
        typeof item.deletedAt === 'undefined',
    );
    return accountTy;
  }
}
