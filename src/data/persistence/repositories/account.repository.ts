import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountEntity } from '../entities';
import { BaseRepository } from './base';
import { AccountRepositoryInterface } from './interfaces';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity>
  implements AccountRepositoryInterface
{
  findByState(state: boolean): AccountEntity[] {
    const currentAccounts = this.findAll().filter((a) => a.state === state);
    return currentAccounts;
  }

  findByCustomer(customerId: string): AccountEntity[] {
    const currentAccounts = this.findAll().filter(
      (c) => c.customer.id === customerId,
    );
    return currentAccounts;
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    const currentAccounts = this.findAll().filter(
      (c) => c.accountType.id === accountTypeId,
    );
    return currentAccounts;
  }

  register(entity: AccountEntity): AccountEntity {
    const currentAccounts = this.findAll().find((a) => a.id === entity.id);
    if (currentAccounts) {
      throw new ConflictException(
        'La cuenta que intenta registrar ya existe en la base de datos',
      );
    }
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  upate(id: string, entity: AccountEntity): AccountEntity {
    const currentAccount = this.findOneById(id);
    if (JSON.stringify(currentAccount) === JSON.stringify(entity)) {
      throw new ConflictException('Los datos a actualizar ya existen');
    }
    const index = this.database.findIndex((i) => i.id === id);
    this.database[index] = {
      ...currentAccount,
      ...entity,
      id: id,
    };
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    this.findOneById(id);
    const index = this.database.findIndex((a) => a.id === id);
    if (soft) this.softDelete(index);
    else this.hardDelete(index);
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    const currentAccount = this.database[index];
    currentAccount.deletedAt = Date.now();
    this.database[index] = {
      ...currentAccount,
    };
  }

  findAll(): AccountEntity[] {
    return this.database.filter((a) => a.deletedAt === undefined);
  }

  findOneById(id: string): AccountEntity {
    const currentAccount = this.findAll().find((a) => a.id === id);
    if (currentAccount) return currentAccount;
    throw new NotFoundException(
      `La cuenta con el Id ${id} no existe en la base de datos!`,
    );
  }
}
