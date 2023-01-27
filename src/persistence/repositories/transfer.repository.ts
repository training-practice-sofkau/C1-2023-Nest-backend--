import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity } from '../entities/transfer.entity';
import { BaseRepository } from './base/base.repository';
import { TransferRepositoryInterface } from './interfaces/transfer.repository.interface';


@Injectable()
export class TransferReoisitory extends BaseRepository<TransferEntity> implements TransferRepositoryInterface{
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
      }
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }
  delete(id: string, soft?: boolean | undefined): void {
    if (!soft) {
      const index = this.database.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.database.splice(index, 1);
      } else {
        throw new NotFoundException(`El ID ${id} no existe en base de datos`);
      }
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.database[index].deletedAt = Date.now();
      } else {
        throw new NotFoundException(`El ID ${id} no existe en base de datos`);
      }
    }
  }
  findAll(): TransferEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): TransferEntity {
    throw new Error('Method not implemented.');
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



