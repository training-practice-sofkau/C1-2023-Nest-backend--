import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransferEntity } from '../entities';
import { BaseRepository } from './base';
import { TransferRepositoryInterface } from './interfaces';

@Injectable()
export class TransferRepository
  extends BaseRepository<TransferEntity>
  implements TransferRepositoryInterface
{
  findByIncomeAccount(accountId: string): TransferEntity[] {
    const currentTransfers = this.findAll().filter(
      (t) => t.income.id === accountId,
    );
    return currentTransfers;
  }

  findByOutcomeAccount(accountId: string): TransferEntity[] {
    const currentTransfers = this.findAll().filter(
      (t) => t.outcome.id === accountId,
    );
    return currentTransfers;
  }

  findOutcomeByDataRange(
    accountId: string,
    dateInit: number | Date,
    dateEnd: number | Date,
  ): TransferEntity[] {
    const currentTransfers = this.findByOutcomeAccount(accountId).filter(
      (t) => t.dateTime <= dateEnd && t.dateTime >= dateInit,
    );
    return currentTransfers;
  }

  findIncomeByDataRange(
    accountId: string,
    dateInit: number | Date,
    dateEnd: number | Date,
  ): TransferEntity[] {
    const currentTransfers = this.findByIncomeAccount(accountId).filter(
      (t) => t.dateTime <= dateEnd && t.dateTime >= dateInit,
    );
    return currentTransfers;
  }

  register(entity: TransferEntity): TransferEntity {
    const currentTransfers = this.findAll().find((t) => t.id === entity.id);
    if (currentTransfers) {
      throw new ConflictException(
        'La transferencia que intenta registrar ya existe en la base de datos',
      );
    } else {
      this.database.push(entity);
    }
    return this.database.at(-1) ?? entity;
  }

  upate(id: string, entity: TransferEntity): TransferEntity {
    const currentTransfer = this.findOneById(id);
    if (JSON.stringify(currentTransfer) === JSON.stringify(entity)) {
      throw new ConflictException('Los datos a actualizar ya existen');
    }
    const index = this.database.findIndex((t) => t.id === id);
    this.database[index] = {
      ...currentTransfer,
      ...entity,
      id: id,
    };
    return this.database[index];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const currentTransfer = this.findOneById(id);
    const index = this.database.findIndex((t) => t.id === id);
    if (soft && currentTransfer) {
      this.softDelete(index);
    }
    this.hardDelete(index);
  }

  private hardDelete(index: number): void {
    this.database.slice(index, 1);
  }

  private softDelete(index: number): void {
    const currentAccount = this.database[index];
    currentAccount.deletedAt = Date.now();
    this.upate(currentAccount.id, currentAccount);
  }

  findAll(): TransferEntity[] {
    return this.database.filter((t) => t.deletedAt === undefined);
  }

  findOneById(id: string): TransferEntity {
    const currentDeposit = this.findAll().find((t) => t.id === id);
    if (currentDeposit) {
      return currentDeposit;
    } else {
      throw new NotFoundException(
        `La transferencia con el Id ${id} no existe en la base de datos`,
      );
    }
  }
}
