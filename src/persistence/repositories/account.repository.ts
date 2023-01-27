import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/services/account.entity';

@Injectable()
export class CustomerRepository {
  private readonly database: Array<AccountEntity>;

  constructor() {
    this.database = new Array<AccountEntity>();
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

  findOneById(id: string): AcountEntity {
    throw new Error('This method is not implemented');
  }
}