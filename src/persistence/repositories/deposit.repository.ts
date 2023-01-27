import { Injectable } from '@nestjs/common';
import { DepositEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerRepository implements BaseRepository<DepositEntity> {
  private readonly database: Array<DepositEntity>;

  constructor() {
    this.database = new Array<DepositEntity>();
  }

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
}
