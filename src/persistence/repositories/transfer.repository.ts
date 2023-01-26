import { Injectable } from '@nestjs/common';
import { AccountEntity, TransferEntity } from '../entities';
import { BaseRepository } from './base';
import { TransferRepositoryInterface } from './interfaces';

@Injectable()
export class TransferRepository
  extends BaseRepository<TransferEntity>
  implements TransferRepositoryInterface
{
  constructor() {
    super();
  }
  findByIncome(account: AccountEntity): TransferEntity[] {
    throw new Error('Method not implemented.');
  }
  findByOutcome(account: AccountEntity): TransferEntity[] {
    throw new Error('Method not implemented.');
  }
  register(entity: TransferEntity): TransferEntity {
    throw new Error('Method not implemented.');
  }
  upate(id: string, entity: TransferEntity): TransferEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): TransferEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): TransferEntity {
    throw new Error('Method not implemented.');
  }
}
