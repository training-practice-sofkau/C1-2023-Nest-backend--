import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { DepositRepositoryInterface } from './interface/deposit/deposit-repository.interface';

@Injectable()
export class DepositRepository
  extends BodyRepositoryAbstract<DepositEntity>
  implements DepositRepositoryInterface {
  register(entity: DepositEntity): DepositEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: DepositEntity): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.id === id,
    );
    if (depositIndex >= 0) {
      const data = this.database[depositIndex];
      this.database[depositIndex] = {
        ...data,
        ...entity,
        id: id,
      };
      return this.database[depositIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  delete(id: string, soft?: boolean | undefined): void {
    const deposit = this.findOneById(id)
    if (soft || soft === undefined) {
      this.softDelete(id)
    }
    else {
      this.hardDelete(id)
    }
  }
  findAll(): DepositEntity[] {
    return this.database.filter(deposit => deposit.deletedAt === undefined);
  }
  findOneById(id: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.id === id,
    );
    if (depositIndex >= 0) {
      return this.database[depositIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByAccountId(accountId: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.accountId.id === accountId,
    );
    if (depositIndex >= 0) {
      return this.database[depositIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByAccountTypeId(accountTypeId: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.accountId.accountType.id === accountTypeId,
    );
    if (depositIndex >= 0) {
      return this.database[depositIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByCustomerId(customerId: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.accountId.customerId.id === customerId,
    );
    if (depositIndex >= 0) {
      return this.database[depositIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByEmail(email: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) => deposit.accountId.customerId.email === email,
    );
    if (depositIndex >= 0) {
      return this.database[depositIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByDocumentTypeId(documentTypeId: string): DepositEntity {
    const depositIndex = this.database.findIndex(
      (deposit) =>
        deposit.accountId.customerId.documentType.id === documentTypeId,
    );
    if (depositIndex >= 0) {
      return this.database[depositIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findAmountGreaterThan(amount: number): DepositEntity[] {
    let arrayAmount: DepositEntity[] = [];
    this.database.map((deposit) => {
      if (deposit.amount > amount) {
        arrayAmount.push(deposit);
      }
    });
    if (arrayAmount.length > 0) {
      return arrayAmount
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findAmountLessThan(amount: number): DepositEntity[] {
    let arrayAmount: DepositEntity[] = [];
    this.database.map((deposit) => {
      if (deposit.amount < amount) {
        arrayAmount.push(deposit);
      }
    });
    if (arrayAmount.length > 0) {
      return arrayAmount
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  hardDelete(id: string): void {
    const depositIndex = this.database.findIndex(
      (account) => account.id === id
    );
    if (depositIndex >= 0) {
      this.database.splice(depositIndex, 1);
    }
    else {
      throw new NotFoundException("No se encontro ningun elemento")
    }
  }
  softDelete(id: string): void {
    const deposit = this.findOneById(id)
    deposit.deletedAt = Date.now()
    this.update(id, deposit)
  }
}
