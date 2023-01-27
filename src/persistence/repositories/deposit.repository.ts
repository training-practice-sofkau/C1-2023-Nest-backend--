import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositEntity } from '../entities/deposit.entity';
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
    const deposit = this.findOneById(id);
    if (soft || soft === undefined) {
      deposit.deletedAt = Date.now();
      this.update(id, deposit);
    } else {
      const index = this.database.findIndex(
        (item) => item.id === id && (item.deletedAt ?? true) === true,
      );
      this.database.splice(index, 1);
    }
  }

  findAll(): DepositEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }

  findOneById(id: string): DepositEntity {
    const deposit = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (deposit) return deposit;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  fun(accountId: string): void {
    throw new Error('Method not implemented.');
  }
}
