import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity>
  implements BaseRepositoryInterface<AccountEntity>
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
    throw new Error('This method is not implemented');
  }

  private hardDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  private softDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  findAll(): AccountEntity[] {
    throw new Error('This method is not implemented');
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
      //filtra segun una condicion y devuelve un array
      (item) => item.state == state && typeof item.deletedAt === 'undefined',
    );
    return estado;
  }

  findByCustomer(customerId: string): AccountEntity[] {
    const client = this.database.filter(
      //filtra segun una condicion y devuelve un array
      (item) =>
        item.customerId == customerId && typeof item.deletedAt === 'undefined',
    );
    return client;
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    const accountType = this.database.filter(
      //filtra segun una condicion y devuelve un array
      (item) =>
        item.accountTypeId == accountTypeId && typeof item.deletedAt === 'undefined',
    );
    return accountType;
  }
}
