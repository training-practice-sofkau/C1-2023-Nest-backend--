import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountTypeEntity } from '../entities';
import { BaseRepository } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  findByState(state: boolean): AccountTypeEntity[] {
    const currentAccountTypes = this.database.filter((n) => n.state === state);
    if ((currentAccountTypes.length = 0)) {
      throw new NotFoundException(
        `No hay tipos de cuentas en estado ${state ? 'activo' : 'inactivo'}`,
      );
    }
    return this.database.filter((n) => n.state === state);
  }

  findByName(name: string): AccountTypeEntity[] {
    const currentAccountTypes = this.database.filter((n) => n.name === name);
    if ((currentAccountTypes.length = 0)) {
      throw new NotFoundException(
        `No existen tipos de cuentas con el nombre ${name}`,
      );
    }
    return currentAccountTypes;
  }

  register(entity: AccountTypeEntity): AccountTypeEntity {
    const currentAccountType = this.database.find((i) => i.id === entity.id);
    if (currentAccountType) {
      throw new ConflictException(
        'El tipo de cuenta que intenta registrar ya existe en la base de datos',
      );
    } else {
      this.database.push(entity);
    }
    return this.database.at(-1) ?? entity;
  }

  upate(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const accountType = this.findOneById(id);
    if (accountType === entity) {
      throw new ConflictException('Los datos a actualizar ya existen');
    }
    const index = this.database.findIndex((i) => i.id === id);
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
    const index = this.database.findIndex((i) => i.id === id);
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
