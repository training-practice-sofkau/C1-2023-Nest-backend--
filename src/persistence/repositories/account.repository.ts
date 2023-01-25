import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/persistence/entities/account.entity';

@Injectable()
export class AccountRepository {
  private readonly database: Array<AccountEntity>;

  constructor() {
    this.database = new Array<AccountEntity>();
  }

  register(): AccountEntity {
    throw new Error('This method is not implemented');
  }

  update(): AccountEntity {
    throw new Error('This method is not implemented');
  }

  delete(): void {
    throw new Error('This method is not implemented');
  }

  findAll(): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(): AccountEntity {
    throw new Error('This method is not implemented');
  }
}
