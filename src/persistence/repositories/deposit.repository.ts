/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DespositEntity } from '../entities/deposit.entity';

@Injectable()
export class DepositRepository {
  private readonly database: Array<DespositEntity>;

  constructor() {
    this.database = new Array<DespositEntity>();
  }

  register(entity: DespositEntity): DespositEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: DespositEntity): DespositEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DespositEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): DespositEntity {
    throw new Error('This method is not implemented');
  }
}
