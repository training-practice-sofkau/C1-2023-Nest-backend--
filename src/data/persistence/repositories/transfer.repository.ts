import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity } from '../../data/persistence/entities';
import { BaseRepository } from './base/base.repository';
import { TransferRepositoryInterface } from './interfaces/transfer-repository.interface';

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

  findAll(): TransferEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }

  findOneById(id: string): TransferEntity {
    const transfer = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (transfer) return transfer;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    const outcomeR = this.database.filter(
      (item) =>
        item.outcome.id === accountId &&
        typeof item.deletedAt === 'undefined' &&
        item.dateTime >= dateInit &&
        item.dateTime <= dateEnd,
    );
    if (outcomeR === undefined) throw new NotFoundException();
    return outcomeR;
  }

  findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    const incomeR = this.database.filter(
      (item) =>
        item.income.id === accountId &&
        typeof item.deletedAt === 'undefined' &&
        item.dateTime >= dateInit &&
        item.dateTime <= dateEnd,
    );
    if (incomeR === undefined) throw new NotFoundException();
    return incomeR;
  }
}
