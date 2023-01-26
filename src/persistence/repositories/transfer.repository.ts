import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity } from '../entities/transfer.entity';

@Injectable()
export class TransferRepository {
  private readonly database: Array<TransferEntity>;

  constructor() {
    this.database = new Array<TransferEntity>();
  }

  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: TransferEntity): TransferEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deleteAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as TransferEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(): void {
    throw new Error('This method is not implemented');
  }

  findAll(): TransferEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(): TransferEntity {
    throw new Error('This method is not implemented');
  }
  findOutcomeByDataRange(): /*accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,*/
  TransferEntity[] {
    throw new Error('This method is not implemented');
  }

  findIncomeByDataRange(): /*accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,*/
  TransferEntity[] {
    throw new Error('This method is not implemented');
  }
}
