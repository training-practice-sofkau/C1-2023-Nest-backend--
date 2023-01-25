import { Injectable } from '@nestjs/common';
import { DepositEntity } from '../entities/deposit.entity';
import { BaseRepository } from './base';
import { DepositRepositoryInterface } from './interfaces';

@Injectable()
export class DepositRepository
  extends BaseRepository<DepositEntity>
  implements DepositRepositoryInterface
{
  register(entity: DepositEntity): DepositEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: DepositEntity): DepositEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DepositEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): DepositEntity {
    throw new Error('This method is not implemented');
  }

  fun(accountId: string): void {
    throw new Error('Method not implemented.');
  }
}
