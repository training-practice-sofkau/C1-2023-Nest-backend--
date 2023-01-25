import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { AccountRepositoryInterface } from './interface/account/account-repository.interface';

@Injectable()
export class AccountRepository
  extends BodyRepositoryAbstract<AccountEntity>
  implements AccountRepositoryInterface
{
  register(entity: AccountEntity): AccountEntity {
    throw new Error('This method is not implemented');
  }
  update(id: string, entity: AccountEntity): AccountEntity {
    throw new Error('This method is not implemented');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('This method is not implemented');
  }
  findAll(): AccountEntity[] {
    throw new Error('This method is not implemented');
  }
  findOneById(id: string): AccountEntity {
    throw new Error('This method is not implemented');
  }
}
