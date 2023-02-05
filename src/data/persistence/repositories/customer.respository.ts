import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { BaseRepository } from './base';
import { CustomerRepositoryInterface } from './interfaces';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface
{
  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  //inico sesion

  update(id: string, entity: CustomerEntity): CustomerEntity {
    console.log('data ', this.database);
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    console.log('index ', index);
    console.log('index >= 0 ', index >= 0);
    if (index >= 0) {
      console.log('ENTRA EN IF');
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as CustomerEntity;
    } else {
      console.log('ENTRA EN ELSE');
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    if (soft || soft === undefined) {
      this.softDelete(id);
    } else {
      this.hardDelete(id);
    }
  }

  findAll(): CustomerEntity[] {
    //return this.database.filter((item) => item.deletedAt === undefined);
    return this.database.filter((item) => item);
  }

  findOneById(id: string): CustomerEntity {
    const customer = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (customer) return customer;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findOneByEmailAndPassword(email: string, password: string): boolean {
    const index = this.database.findIndex(
      (item) =>
        item.email === email &&
        item.password === password &&
        typeof item.deletedAt === 'undefined',
    );
    return index >= 0 ? true : false;
  }

  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity {
    const customer = this.database.find(
      (item: CustomerEntity) =>
        item.documentType.id === documentTypeId &&
        item.document === document &&
        typeof item.deletedAt === 'undefined',
    );
    if (customer) return customer;
    else
      throw new NotFoundException(
        `El ID ${documentTypeId} y DOCUMENTE ${document} no existe en base de datos`,
      );
  }

  findOneByEmail(email: string): CustomerEntity {
    const customer = this.database.find(
      (item: CustomerEntity) =>
        item.email === email && typeof item.deletedAt === 'undefined',
    );
    if (customer) return customer;
    else
      throw new NotFoundException(`El ID ${email} no existe en base de datos`);
  }

  findOneByPhone(phone: string): CustomerEntity {
    const customer = this.database.find(
      (item: CustomerEntity) =>
        item.phone === phone && typeof item.deletedAt === 'undefined',
    );
    if (customer) return customer;
    else
      throw new NotFoundException(`El ID ${phone} no existe en base de datos`);
  }

  findByState(state: boolean): CustomerEntity[] {
    const customers = this.database.filter((item) => item.state === state);
    return customers;
  }

  findByFullName(fullName: string): CustomerEntity[] {
    const customers = this.database.filter(
      (item) => item.fullName === fullName,
    );
    return customers;
  }

  private hardDelete(id: string): void {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    this.database.splice(index, 1);
  }

  private softDelete(id: string): void {
    const customer = this.findOneById(id);
    console.log('acc ', customer);
    const v: CustomerEntity = {
      ...customer,
    };
    v.deletedAt = Date.now();
    console.log('data soft ', this.database);
    this.update(id, v);
  }
}
