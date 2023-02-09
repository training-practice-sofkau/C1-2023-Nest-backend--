import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositEntity } from '../entities/deposite.entity';
import { BaseRepository } from './base/base.repository';
import { DepositRepositoryInterface } from './interfaces/deposit.repository.interface';
@Injectable()
export class DepositRepository extends BaseRepository<DepositEntity> implements DepositRepositoryInterface {
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
      }
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft = true): void {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (index >= 0) {
      if (soft) {
        this.database[index].deletedAt =  Date.now();
      } else {
        this.database.splice(index, 1);
      }
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
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
  findByAccountId(accountId: string): DepositEntity[] {
    return this.database.filter((item) => item.account.id === accountId && (item.deletedAt ?? true) === true);
  }
  findByDataRange(id: string, DateMin: number | Date, DateMax: Number | Date): DepositEntity[] {
    const arrayDeposites = this.findAll()
    return arrayDeposites.filter(deposit => (deposit.account.id === id && deposit.dateTime >= DateMin && deposit.dateTime <= DateMax))
  }
  }

