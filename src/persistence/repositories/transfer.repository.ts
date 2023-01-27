import { Injectable } from '@nestjs/common';
import { TransferEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerRepository implements BaseRepository<TransferEntity> {
  private readonly database: Array<TransferEntity>;

  constructor() {
    this.database = new Array<TransferEntity>();
  }

  register(entity: TransferEntity): TransferEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: TransferEntity): TransferEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): TransferEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): TransferEntity {
    throw new Error('This method is not implemented');
  }
}
