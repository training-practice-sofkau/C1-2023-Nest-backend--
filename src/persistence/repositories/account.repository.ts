import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { AccountBase } from './base';

@Injectable()
export class AccountRepository extends AccountBase<AccountEntity> {
  constructor() {
    super();
  }
  register(entity: AccountEntity): AccountEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): AccountEntity {
    throw new Error('This method is not implemented');
  }
}
