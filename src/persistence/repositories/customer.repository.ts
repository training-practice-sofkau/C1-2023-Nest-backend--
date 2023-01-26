import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { CustomerInterface } from './interfaces/customer-repository.Interface';
@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerInterface
{
  findDocumentById(): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  fonfOneById(id: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }
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

  findOneByDocumentTypeAndDocument(): /*
    documentTypeId: string,
    document: string,*/
  CustomerEntity {
    throw new Error('This method is not implemented');
  }

  findOneByEmail(/*email: string*/): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  findOneByPhone(/*phone: string*/): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  findByState(/*state: boolean*/): CustomerEntity[] {
    throw new Error('This method is not implemented');
  }

  findByFullName(/*fullName: string*/): CustomerEntity[] {
    throw new Error('This method is not implemented');
  }
}
