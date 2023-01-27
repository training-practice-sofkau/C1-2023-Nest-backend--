import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity } from '../entities/transfer-entity';
import { BaseRepository } from './base/base.repository';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';

@Injectable()
export class TransferRepository
  extends BaseRepository<TransferEntity>
  implements BaseRepositoryInterface<TransferEntity>
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
    const transfer = this.findOneById(id);
    if (soft || soft === undefined) {
      transfer.deletedAt = Date.now();
      this.update(id, transfer);
    } else {
      const index = this.database.findIndex(
        (item) => item.id === id && (item.deletedAt ?? true) === true,
      );
      this.database.splice(index, 1);
    }
  }

  hardDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  softDelete(id: string): void {
    const Transfer = this.findOneById(id);
    Transfer.deletedAt = Date.now();
    this.update(id, Transfer);
    throw new Error('This method is not implemented');
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
    throw new Error('This method is not implemented');
  }

  findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    throw new Error('This method is not implemented');
  }
}
