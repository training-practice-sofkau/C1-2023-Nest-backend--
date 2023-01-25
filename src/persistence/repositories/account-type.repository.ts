import { Injectable } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { AccountTypeRepositoryInterface } from './interface/account-type/account-type-repository.interface';

@Injectable()
export class AccountTypeRepository
  extends BodyRepositoryAbstract<AccountTypeEntity>
  implements AccountTypeRepositoryInterface {
    register(entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error('This method is not implemented');
    }
    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error('This method is not implemented');
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('This method is not implemented');
    }
    findAll(): AccountTypeEntity[] {
        throw new Error('This method is not implemented');
    }
    findOneById(id: string): AccountTypeEntity {
        throw new Error('This method is not implemented');
    }
  }
