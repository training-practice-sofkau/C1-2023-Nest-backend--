import { Injectable } from '@nestjs/common';
import { TransferEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { TransferRepositoryInterface } from './interface/transfer/transfer-repository.interface';

@Injectable()
export class TransferRespository
  extends BodyRepositoryAbstract<TransferEntity>
  implements TransferRepositoryInterface
{
  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.id === entity.id,
    );
    return this.database[transferIndex];
  }
  update(id: string, entity: TransferEntity): TransferEntity {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.id === id,
    );
    const data = this.database[transferIndex];
    this.database[transferIndex] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[transferIndex];
  }
  delete(id: string, soft?: boolean | undefined): void {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.id === id,
    );
    this.database.splice(transferIndex, 1);
  }
  findAll(): TransferEntity[] {
    return this.database;
  }
  findOneById(id: string): TransferEntity {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.id === id,
    );
    return this.database[transferIndex];
  }
  findByIncomeCustomerId(id: string): TransferEntity {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.income.customerId.id === id,
    );
    return this.database[transferIndex];
  }
  findByIncomeId(id: string): TransferEntity {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.income.id === id,
    );
    return this.database[transferIndex];
  }
  findByOutcomeId(id: string): TransferEntity {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.outcome.id === id,
    );
    return this.database[transferIndex];
  }
  findByOutcomeCustomerId(id: string): TransferEntity {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.outcome.customerId.id === id,
    );
    return this.database[transferIndex];
  }
  findByAmountGreaterThan(amount: number): TransferEntity[] {
    let arrayAmount: TransferEntity[] = [];
    this.database.map((transfer) => {
      if (transfer.amount > amount) {
        arrayAmount.push(transfer);
      }
    });
    return arrayAmount;
  }
  findByAmountLessThan(amount: number): TransferEntity[] {
    let arrayAmount: TransferEntity[] = [];
    this.database.map((transfer) => {
      if (transfer.amount < amount) {
        arrayAmount.push(transfer);
      }
    });
    return arrayAmount;
  }
}
