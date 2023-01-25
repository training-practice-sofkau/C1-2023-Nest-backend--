import { Injectable } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';
import { AccountTypeBase } from './base';

@Injectable()
export class AccountTypeRepository extends AccountTypeBase<AccountTypeEntity> {
  constructor() {
    super();
  }
  register(entity: AccountTypeEntity): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }
}
