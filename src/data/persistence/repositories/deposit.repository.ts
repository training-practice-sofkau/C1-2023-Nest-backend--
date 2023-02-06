import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DepositEntity } from '../entities';
import { BaseRepository } from './base';
import { DepositREpositoryInterface } from './interfaces';

@Injectable()
export class DepositRepository
  extends BaseRepository<DepositEntity>
  implements DepositREpositoryInterface
{
  findByAccountId(accoundId: string): DepositEntity[] {
    const currentDeposits = this.findAll().filter(
      (d) => d.account.id === accoundId,
    );
    return currentDeposits;
  }

  findByDateRange(
    dateInit: number | Date,
    dateEnd: number | Date,
  ): DepositEntity[] {
    const currentDeposits = this.findAll().filter(
      (d) => d.dateTime <= dateEnd && d.dateTime >= dateInit,
    );
    return currentDeposits;
  }

  register(entity: DepositEntity): DepositEntity {
    const currentDeposits = this.findAll().find((d) => d.id === entity.id);
    if (currentDeposits) {
      throw new ConflictException(
        'El deposito que intenta registrar ya existe en la base de datos',
      );
    }
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  upate(id: string, entity: DepositEntity): DepositEntity {
    const currentDeposit = this.findOneById(id);
    if (JSON.stringify(currentDeposit) === JSON.stringify(entity)) {
      throw new ConflictException(
        'Los datos del deposito a actualizar ya existen!',
      );
    }
    const index = this.database.findIndex((d) => d.id === id);
    this.database[index] = {
      ...currentDeposit,
      ...entity,
      id: id,
    };
    return this.database[index];
  }

  delete(id: string, soft?: boolean | undefined): void {
    this.findOneById(id);
    const index = this.database.findIndex((d) => d.id === id);
    if (soft) this.softDelete(index);
    else this.hardDelete(index);
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    const currentDeposit = this.database[index];
    currentDeposit.deletedAt = Date.now();
    this.database[index] = {
      ...currentDeposit,
    };
  }

  findAll(): DepositEntity[] {
    return this.database.filter((a) => a.deletedAt === undefined);
  }

  findOneById(id: string): DepositEntity {
    const currentDeposit = this.findAll().find((d) => d.id === id);
    if (currentDeposit) {
      return Object.assign({}, currentDeposit);
    }
    throw new NotFoundException(
      `El deposito con el Id ${id} no existe en la base de datos`,
    );
  }
}
