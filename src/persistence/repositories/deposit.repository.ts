import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';

@Injectable()
export class depositRepository
  extends BaseRepository<DepositEntity>
  implements BaseRepositoryInterface<DepositEntity>
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
    throw new Error('This method is not implemented');
  }

  private hardDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  private softDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DepositEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): DepositEntity {
    throw new Error('This method is not implemented');
  }

  findByAccountId(accountId: string): DepositEntity[] {
    throw new Error('This method is not implemented');
  }

  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[] {
    throw new Error('This method is not implemented');
  }
}
