import { RepositoryBase } from './base';
import { AccountTypeEntity } from '../entities';
import { IAccountTypeRepository } from './interfaces';

export class AccountTypeRepository
  extends RepositoryBase<AccountTypeEntity>
  implements IAccountTypeRepository
{
  findByState(state: boolean): AccountTypeEntity[] {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): AccountTypeEntity[] {
    throw new Error('Method not implemented.');
  }

  register(entity: AccountTypeEntity): AccountTypeEntity {
    throw new Error('Method not implemented.');
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    throw new Error('Method not implemented.');
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

  findAll(): AccountTypeEntity[] {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): AccountTypeEntity {
    throw new Error('Method not implemented.');
  }
}
