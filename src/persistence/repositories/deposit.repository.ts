
import { DepositEntity } from 'src/persistence/entities/deposit.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base/base.repository';
import { DepositInterface } from './interfaces/deposit-repository.interface';

@Injectable()
export class DepositRepository 
  extends BaseRepository<DepositEntity>
  implements DepositInterface
{

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
    return this.database.filter((item) => item.deleteAt === undefined)
  }

  findOneById(id: string): DepositEntity {
    const customer = this.database.find(
      (item) => item.id === id && (item.deleteAt ?? true) === undefined,
    );
    if (customer) return customer;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }
  findByAccountId(accountId: string): DepositEntity[] {
    const money = this.database .filter(
      (data) => data.account.id == accountId&& typeof data.deleteAt === undefined
    )
    return money;
  }

  findByDataRange(dateInit: Date | number,
  dateEnd: Date | number,
  ) : DepositEntity[] {
    const dateData = this.database.filter(
      (item) => typeof item.deleteAt === undefined && 
      item.dateTime >= dateInit &&
      item.dateTime <= dateEnd,
    );
    if (dateData === undefined) throw new NotFoundException(" No se encuentra informacion de usuario");
    return dateData;
  }
}
