import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountTypeEntity } from '../entities/account-type.entity';
import { BaseRepository } from './base/base.repository';
import { AccountTypeRepositoryInterface } from './interfaces/accouny-type.repository.interface';

@Injectable()
export class AccountTypeRepository extends BaseRepository<AccountTypeEntity> implements AccountTypeRepositoryInterface
{
  findByState(state: boolean): AccountTypeEntity[] {
    return this.database.filter((item) => item.state === state);
  }

  findByName(name: string): AccountTypeEntity[] {
    const currentAccountTypes = this.database.filter(
      (n) => n.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
    return currentAccountTypes;
  }

  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }   

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const accountType = this.findOneById(id);
    if (JSON.stringify(accountType) === JSON.stringify(entity)) {
      throw new ConflictException('Los datos  ya existen');
    }
    const index = this.database.findIndex((a) => a.id === id);
    this.database[index] = {
      ...accountType,
      ...entity,
      id: id,
    };
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    const currentAccountType = this.findOneById(id);
    if (soft && currentAccountType) {
      throw new BadRequestException(
        'El borrado lógico no está implementado para tipos de cuentas',
      );
    }
    const index = this.database.findIndex((a) => a.id === id);
    this.database.slice(index, 1);
  }

  findAll(): AccountTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): AccountTypeEntity {
    const currentAccountType = this.database.find((a) => a.id === id);
    if (currentAccountType) {
      return currentAccountType;
    } else {
      throw new NotFoundException(
        `El tipo de cuenta con el Id ${id} no existe en la base de datos`,
      );
    }
  }
}