import { Injectable } from '@nestjs/common';
import { TransferEntity } from '../entities/transfer.entity';
import { BaseRepository } from './base/base.repository';
import { TransferRepositoryInterface } from './interfaces/transfer.repository.interface';


@Injectable()
export class TransferReoisitory extends BaseRepository<TransferEntity> implements TransferRepositoryInterface{
  register(entity: TransferEntity): TransferEntity {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: TransferEntity): TransferEntity {
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