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
    const currentAccounts = this.findAll().filter((n) => n.state === state);
    if ((currentAccounts.length = 0)) {
      throw new NotFoundException(
        `No hay cuentas en estado ${state ? 'activo' : 'inactivo'}`,
      );
    }
    return this.database.filter((n) => n.state === state);
  }

  findByCustomer(customerId: string): AccountEntity[] {
    const currentAccounts = this.findAll().filter(
      (c) => c.customer.id === customerId,
    );
    if ((currentAccounts.length = 0)) {
      throw new NotFoundException(
        `No existen cuentas registradas con el id de cliente: ${customerId}`,
      );
    }
    return currentAccounts;
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    const currentAccounts = this.findAll().filter(
      (c) => c.acountType.id === accountTypeId,
    );
    if ((currentAccounts.length = 0)) {
      throw new NotFoundException(
        `No existen cuentas registradas con el id de cliente: ${accountTypeId}`,
      );
    }
    return currentAccounts;
  }

  register(entity: AccountEntity): AccountEntity {
    const currentAccounts = this.findAll().find((i) => i.id === entity.id);
    if (currentAccounts) {
      throw new ConflictException(
        'La cuenta que intenta registrar ya existe en la base de datos',
      );
    } else {
      this.database.push(entity);
    }
    return this.database.at(-1) ?? entity;
  }

  upate(id: string, entity: AccountEntity): AccountEntity {
    const currentAccount = this.findOneById(id);
    if (currentAccount === entity) {
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

  delete(id: string, soft?: boolean | undefined): void {
    const currentAccount = this.findOneById(id);
    const index = this.database.findIndex((i) => i.id === id);
    if (soft && currentAccount) {
      this.softDelete(index);
    }
    this.hardDelete(index);
  }

  private hardDelete(index: number): void {
    this.database.slice(index, 1);
  }

  private softDelete(index: number): void {
    const currentAccount = this.database[index];
    currentAccount.deletedAt = Date.now();
    this.upate(currentAccount.id, currentAccount);
  }

  findAll(): AccountEntity[] {
    return this.database.filter((a) => a.deletedAt === undefined);
  }

  findOneById(id: string): AccountEntity {
    const currentAccount = this.findAll().find((a) => a.id === id);
    if (currentAccount) {
      return currentAccount;
    } else {
      throw new NotFoundException(
        `La cuenta con el Id ${id} no existe en la base de datos`,
      );
    }
  }
}
