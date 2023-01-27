import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CustomerEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { CustomerRepositoryInterface } from './interface/customer/customer-repository.interface';

@Injectable()
export class CustomerRepository
  extends BodyRepositoryAbstract<CustomerEntity>
  implements CustomerRepositoryInterface {
  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    const customerIndex = this.database.findIndex(
      (customer) => customer.id === entity.id
    );
    return this.database[customerIndex];
  }
  update(id: string, entity: CustomerEntity): CustomerEntity {
    const customerIndex = this.database.findIndex(
      (customer) => customer.id === id
    );
    const data = this.database[customerIndex];
    this.database[customerIndex] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[customerIndex];
  }
  delete(id: string, soft?: boolean | undefined): void {
    const customerIndex = this.database.findIndex(
      (customer) => customer.id === id
    );
    this.database.splice(customerIndex, 1);
  }
  findAll(): CustomerEntity[] {
    return this.database;
  }
  findOneById(id: string): CustomerEntity {
    const customerIndex = this.database.findIndex(
      (customer) => customer.id === id
    );
    if (customerIndex >= 0) {
      return this.database[customerIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByDocumentTypeId(documentTypeId: string): CustomerEntity {
    const customerIndex = this.database.findIndex(
      (customer) => customer.documentType.id === documentTypeId
    );
    if (customerIndex >= 0) {
      return this.database[customerIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByEmail(email: string): CustomerEntity {
    const customerIndex = this.database.findIndex(
      (customer) => customer.email === email
    );
    if (customerIndex >= 0) {
      return this.database[customerIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByState(state: boolean): CustomerEntity[] {
    let arrayState: CustomerEntity[] = [];
    this.database.map((customer) => {
      if (customer.state === state) {
        arrayState.push(customer);
      }
    });
    if (arrayState.length > 0) {
      return arrayState
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findEmailAndPassword(email: string, password: string): boolean {
    const customer = this.database.filter(customer => customer.email === email && customer.password === password)
    if (customer) {
      return true
    }
    else {
      return false
    }
  }
  findByFullName(name: string): CustomerEntity[] {
    let arrayName: CustomerEntity[] = [];
    this.database.map(customer => {
      if (customer.fullName.includes(name)) {
        arrayName.push(customer)
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
