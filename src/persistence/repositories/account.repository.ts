import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity as AccountEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { CustomerRepositoryInterface as AccountRepositoryInterface } from './interfaces/customer.repository.interface';

@Injectable()
export class AccountRepository extends BaseRepository<AccountEntity> implements AccountRepositoryInterface {
 
  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: AccountEntity): AccountEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      }
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }
  delete(id: string, soft?: boolean | undefined): void {
    if (!soft) {
      const index = this.database.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.database.splice(index, 1);
      } else {
        throw new NotFoundException(`El ID ${id} no existe en base de datos`);
      }
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.database[index].deletedAt = Date.now();
      } else {
        throw new NotFoundException(`El ID ${id} no existe en base de datos`);
      }
    }
  }
  findAll(): AccountEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }
  findOneById(id: string): AccountEntity {
    const index = this.database.findIndex((item) => item.id === id);
    if (index >= 0) {
      return this.database[index];
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
  }
  findOneByEmailAndPassword(email: string, password: string): boolean {
    throw new Error('Method not implemented.');
  }
  findOneByDocumentTypeAndDocument(documentTypeId: string, document: string): AccountEntity {
    const customer = this.database.find(
      (item) =>
        item.id === documentTypeId &&
        item.document === document &&
        item.deletedAt === undefined
    );
    if (customer) return customer;
    else throw new NotFoundException(`No se encontró ningún cliente con el tipo de documento ${documentTypeId} y el número de documento ${document}`);
  }
  findOneByEmail(email: string): AccountEntity {
    const index = this.database.findIndex((item) => item.email === email);
    if (index >= 0) {
      return this.database[index];
    } else {
      throw new NotFoundException(`El correo ${email} no existe en base de datos`);
    }
  }
  findOneByPhone(phone: string): AccountEntity {
    const index = this.database.findIndex((item) => item.phone === phone);
    if (index >= 0) {
      return this.database[index];
    } else {
      throw new NotFoundException(`El telefono ${phone} no existe en base de datos`);
    }
  }
  findByState(state: boolean): AccountEntity[] {
    throw new Error('Method not implemented.');
  }
  findByFullName(fullName: string): AccountEntity[] {
    return this.database.filter((item) => 
        (item.fullName).toLowerCase().includes(fullName.toLowerCase()) && 
        item.deletedAt === undefined
    );
  }
}