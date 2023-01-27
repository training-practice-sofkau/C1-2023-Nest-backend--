import { Injectable } from '@nestjs/common';
import { DepositEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { DepositRepositoryInterface } from './interface/deposit/deposit-repository.interface';

@Injectable()
export class DepositRepository
  extends BodyRepositoryAbstract<DepositEntity>
  implements DepositRepositoryInterface
{
  register(entity: DepositEntity): DepositEntity {
    this.database.push(entity);
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.id === entity.id,
    );
    return this.database[depositIndex];
  }
  update(id: string, entity: DepositEntity): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.id === id,
    );
    const data = this.database[depositIndex];
    this.database[depositIndex] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[depositIndex];
  }
  delete(id: string, soft?: boolean | undefined): void {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.id === id,
    );
    this.database.splice(depositIndex, 1);
  }
  findAll(): DepositEntity[] {
    return this.database;
  }
  findOneById(id: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.id === id,
    );
    return this.database[depositIndex];
  }
  findByAccountId(accountId: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.accountId.id === accountId,
    );
    return this.database[depositIndex];
  }
  findByAccountTypeId(accountTypeId: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.accountId.accountType.id === accountTypeId,
    );
    return this.database[depositIndex];
  }
  findByCustomerId(customerId: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.accountId.customerId.id === customerId,
    );
    return this.database[depositIndex];
  }
  findByEmail(email: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.accountId.customerId.email === email,
    );
    return this.database[depositIndex];
  }
  findByDocumentTypeId(documentTypeId: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) =>
        deposit.accountId.customerId.documentType.id === documentTypeId,
    );
    return this.database[depositIndex];
  }
  findAmountGreaterThan(amount: number): DepositEntity[] {
    let arrayAmount: DepositEntity[] = [];
    this.database.map((deposit) => {
      if (deposit.amount > amount) {
        arrayAmount.push(deposit);
      }
    });
    return arrayAmount;
  }
  findAmountLessThan(amount: number): DepositEntity[] {
    let arrayAmount: DepositEntity[] = [];
    this.database.map((deposit) => {
      if (deposit.amount < amount) {
        arrayAmount.push(deposit);
      }
    });
    return arrayAmount;
  }
}
