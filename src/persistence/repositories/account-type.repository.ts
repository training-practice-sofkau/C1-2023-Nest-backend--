import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountTypeRepository {
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

  findByState(state: boolean): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findByName(name: string): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }
}
