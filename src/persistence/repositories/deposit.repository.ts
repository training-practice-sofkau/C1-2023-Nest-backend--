import { Injectable } from '@nestjs/common';
import { DepositEntity } from '../entities';
import { DepositBase } from './base';

@Injectable()
export class DepositRepository extends DepositBase<DepositEntity> {
  constructor() {
    super();
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
