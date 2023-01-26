import { Injectable } from '@nestjs/common';
import { AccountEntity, DepositEntity } from '../entities';
import { BaseRepository } from './base';
import { DepositREpositoryInterface } from './interfaces';

@Injectable()
export class DepositRepository
  extends BaseRepository<DepositEntity>
  implements DepositREpositoryInterface
{
  constructor() {
    super();
  }
  findByAccount(Account: AccountEntity): DepositEntity[] {
    throw new Error('Method not implemented.');
  }
  register(entity: DepositEntity): DepositEntity {
    throw new Error('Method not implemented.');
  }
  upate(id: string, entity: DepositEntity): DepositEntity {
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
