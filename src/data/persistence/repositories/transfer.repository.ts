import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity } from '../entities/transfer.entity';
import { BaseRepository } from './base';
import { TransferRepositoryInterface } from './interfaces';

@Injectable()
export class TransferRepository
  extends BaseRepository<TransferEntity>
  implements TransferRepositoryInterface
{
  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: TransferEntity): TransferEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as TransferEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    if (soft || soft === undefined) {
      console.log('entra en if reposiroty');
      this.softDelete(id);
    } else {
      console.log('entra en else reposiroty');
      this.hardDelete(id);
    }
    console.log('DATABSE', this.database);
  }

  findAll(): TransferEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }

  findOneById(id: string): TransferEntity {
    const customer = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (customer) return customer;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findOutcomeByDataRange(
    accountId: string,
    dateInit: number | Date,
    dateEnd: number | Date,
  ): TransferEntity[] {
    const transfers = this.database.filter(
      (item: TransferEntity) =>
        dateInit >= item.dateTime &&
        dateEnd <= item.dateTime &&
        item.income.id === accountId,
    );
    return transfers;
  }

  findIncomeByDataRange(
    accountId: string,
    dateInit: number | Date,
    dateEnd: number | Date,
  ): TransferEntity[] {
    const transfers = this.database.filter(
      (item: TransferEntity) =>
        dateInit >= item.dateTime &&
        dateEnd <= item.dateTime &&
        item.income.id === accountId,
    );
    return transfers;
  }

  private hardDelete(id: string): void {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    this.database.splice(index, 1);
  }

  private softDelete(id: string): void {
    const transfer = this.findOneById(id);
    console.log('acc ', transfer);
    const v: TransferEntity = {
      ...transfer,
    };
    v.deletedAt = Date.now();
    console.log('data soft ', this.database);
    this.update(id, v);
  }
}
