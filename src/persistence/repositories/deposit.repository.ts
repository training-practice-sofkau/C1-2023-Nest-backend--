import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositEntity } from 'src/persistence/entities/deposit.entity';

@Injectable()
export class DepositRepository {
  private readonly database: Array<DepositEntity>;

  constructor() {
    this.database = new Array<DepositEntity>();
  }

  register(entity: DepositEntity): DepositEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DepositEntity): DepositEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deleteAt ?? true) === undefined,
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
    const depositAmount = this.findOneById(id);
    if (soft || soft === undefined) {
      depositAmount.deleteAt = Date.now();
      this.update(id, depositAmount);
    } else {
      const index = this.database.findIndex(
        (item) => item.id === id && (item.deleteAt ?? true) === undefined, //dar aclaracion
      );
      this.database.splice(index, 1);
    }
  }

  findAll(): DepositEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): DepositEntity {
    const customer = this.database.find(
      (item) => item.id === id && (item.deleteAt ?? true) === undefined,
    );
    if (customer) return customer;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }
  findByAccountId(/*accountId: string*/): DepositEntity[] {
    throw new Error('This method is not implemented');
  }

  findByDataRange(): //dateInit: Date | number,
  //dateEnd: Date | number,
  DepositEntity[] {
    throw new Error('This method is not implemented');
  }
}
