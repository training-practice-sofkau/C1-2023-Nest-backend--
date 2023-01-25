import { Injectable } from '@nestjs/common';
import { DepositEntity } from '../entities';
import { BaseRepository } from './base/';
import { BaseRepositoryInterface } from './interfaces/';

@Injectable()
export class CustomerRepository
  extends BaseRepository<DepositEntity>
  implements BaseRepositoryInterface<DepositEntity>
{
  register(entity: DepositEntity): DepositEntity {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: DepositEntity): DepositEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): DepositEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): DepositEntity {
    throw new Error('Method not implemented.');
  }
}
