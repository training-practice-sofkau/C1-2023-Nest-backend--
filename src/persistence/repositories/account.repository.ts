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
    throw new Error('This method is not implemented');
  }

  findByState(state: boolean): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findByCustomer(customerId: string): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    throw new Error('This method is not implemented');
  }
}
