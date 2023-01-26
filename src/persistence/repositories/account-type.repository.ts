import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { AccountTypeRepositoryInterface } from './interface/account-type/account-type-repository.interface';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountTypeRepository
  extends BodyRepositoryAbstract<AccountTypeEntity>
  implements AccountTypeRepositoryInterface {
  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const accountTypeIndex = this.database.findIndex(
      (accountType) => accountType.id === id,
    );
    if (accountTypeIndex >= 0) {
      const data = this.database[accountTypeIndex];
      this.database[accountTypeIndex] = {
        ...data,
        ...entity,
        id: id,
      };
      return this.database[accountTypeIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  delete(id: string, soft?: boolean | undefined): void {
    const account = new AccountRepository()
    const result = account.findByAccountTypeId(id);
    if (result) {
      throw new NotFoundException("No se puede eliminar, depende de otra entidad")
    }
    else {
      const accountTypeIndex = this.database.findIndex(
        (accountType) => accountType.id === id,
      );
      this.database.splice(accountTypeIndex, 1);
    }
  }
  findAll(): AccountTypeEntity[] {
    return this.database;
  }
  findOneById(id: string): AccountTypeEntity {
    const accountTypeIndex = this.database.findIndex(
      (accountType) => accountType.id === id,
    );
    if (accountTypeIndex >= 0) {
      return this.database[accountTypeIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByState(state: boolean): AccountTypeEntity[] {
    let arrayState: AccountTypeEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.state === state) {
        arrayState.push(documentType);
      }
    });
    if (arrayState.length > 0) {
      return arrayState
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByName(name: string): AccountTypeEntity[] {
    let arrayName: AccountTypeEntity[] = [];
    this.database.map(accountType => {
      if (accountType.name.includes(name)) {
        arrayName.push(accountType)
      }
    })
    if (arrayName.length > 0) {
      return arrayName
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }

}
