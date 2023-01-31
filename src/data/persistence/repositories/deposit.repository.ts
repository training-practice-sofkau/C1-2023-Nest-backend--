import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositEntity } from '../entities';
import { BaseRepository } from './base';
import { DepositRepositoryInterface } from './interfaces';

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

  findAll(): DepositEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }

  findOneById(id: string): DepositEntity {
    const customer = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (customer) return customer;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByAccountId(account: string): DepositEntity[] {
    const bill = this.database.filter(
      (item) =>
        item.account.id == account && typeof item.deletedAt === 'undefined',
    );
    return bill;
  }

  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[] {
    const dataR = this.database.filter(
      (item) =>
        typeof item.deletedAt === 'undefined' &&
        item.dateTime >= dateInit &&
        item.dateTime <= dateEnd,
    );
    if (dataR === undefined) throw new NotFoundException();
    return dataR;
  }
}
