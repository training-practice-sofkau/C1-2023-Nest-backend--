import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity } from '../entities/transfer.entity';
import { BaseRepository } from './base/base.repository';
import { TransferRepositoryInterface } from './interfaces/transfer.repository.interface';


@Injectable()
export class TransferReoisitory extends BaseRepository<TransferEntity> implements TransferRepositoryInterface{
  findByDateRange(accountId: string, arg1: number, arg2: number) {
    throw new Error("Method not implemented.");
  }
  findByIncomeId(accountId: string): TransferEntity[] {
    return this.findAll().filter(t => t.income.id === accountId);
  }
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
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    const currentTransfers = this.findByOutcomeId(accountId).filter(
      (t) => t.dateTime <= dateEnd && t.dateTime >= dateInit,
    );
    return currentTransfers;
  
  }

  findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    const currentTransfers = this.findByIncomeId(accountId).filter(
      (t) => t.dateTime <= dateEnd && t.dateTime >= dateInit,
    );
    return currentTransfers;
  }
  findByOutcomeId(accountId: string): TransferEntity[] {
    return this.findAll().filter(t => t.outcome.id === accountId);
  }
  

  }



