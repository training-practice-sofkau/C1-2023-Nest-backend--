import { CustomerEntity } from '../entities/customer.entity';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base/base.repository';
import { threadId } from 'worker_threads';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements BaseRepositoryInterface<CustomerEntity>
{
  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as CustomerEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    const customer = this.findOneById(id);
    if (soft || soft === undefined) {
      customer.deletedAt = Date.now();
      this.update(id, customer);
    } else {
      const index = this.database.findIndex(
        (item) => item.id === id && (item.deletedAt ?? true) === true,
      );
      this.database.splice(index, 1);
    }
  }

  findAll(): CustomerEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
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
    documentType: string,
    document: string,
  ): boolean {
    const index = this.database.findIndex(
      (item) =>
        item.documentType.id === documentType &&
        item.document === document &&
        typeof item.deletedAt === 'undefined',
    );
    return index >= 0 ? true : false;
  }
  findOneByEmail(email: string): CustomerEntity {
    const customerIndex = this.database.findIndex(
      (customer) => customer.email === email,
    );
    return this.database[customerIndex];
  }
  findOneByPhone(phone: string): CustomerEntity {
    const index = this.database.findIndex((item) => item.phone == phone);
    return this.database[index];
  }

  findByState(state: boolean): CustomerEntity[] {
    const arrayState: CustomerEntity[] = [];
    this.database.map((customer) => {
      if (customer.state === state) {
        arrayState.push(customer);
      }
    });
    return arrayState;
  }

  findByFullName(fullName: string): CustomerEntity[] {
    const nombre = this.database.filter(
      (item) =>
        item.fullName == fullName && typeof item.deletedAt === 'undefined',
    );
    return nombre;
  }
}
