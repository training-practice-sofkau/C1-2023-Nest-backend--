import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositEntity } from '../entities';
import { BaseRepository } from './base/';
import { DepositRepositoryInterface } from './interfaces/';

@Injectable()
export class DepositRepository
  extends BaseRepository<DepositEntity>
  implements DepositRepositoryInterface
{
  register(entity: DepositEntity): DepositEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DepositEntity): DepositEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as DepositEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    this.findOneById(id);
    if (soft || soft === undefined) {
      const index = this.database.findIndex((item) => item.id === id);
      this.softDelete(index);
    } else {
      const index = this.database.findIndex(
        (item) => item.id === id && (item.deletedAt ?? true) === true,
      );
      this.hardDelete(index);
    }
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    let newDeposit = new DepositEntity();
    const deposit = this.database[index];
    newDeposit = {
      ...newDeposit,
      ...deposit,
      id: deposit.id,
    };
    newDeposit.deletedAt = Date.now();
    this.update(deposit.id, newDeposit);
  }

  findAll(): DepositEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }

  findOneById(id: string): DepositEntity {
    const account = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (account) return account;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByAccountId(accountId: string): DepositEntity[] {
    return this.database.filter(
      (item) => item.account.id === accountId && item.deletedAt === undefined,
    );
  }

  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[] {
    return this.findAll().filter(
      (item) =>
        item.dateTime >= Number(dateInit) && item.dateTime <= Number(dateEnd),
    );
  }
}
