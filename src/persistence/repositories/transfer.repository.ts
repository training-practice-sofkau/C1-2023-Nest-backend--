import { Injectable } from '@nestjs/common';
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

  update(): TransferEntity {
    throw new Error('This method is not implemented');
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
}
