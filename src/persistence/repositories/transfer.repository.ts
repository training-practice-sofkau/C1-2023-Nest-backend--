import { Injectable } from '@nestjs/common';
import { TransferEntity } from '../entities';
import { TransferBase } from './base';

@Injectable()
export class TransferRepository extends TransferBase<TransferEntity> {
  constructor() {
    super();
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
