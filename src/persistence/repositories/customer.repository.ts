import { Injectable } from '@nestjs/common';
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
      return this.database[customerIndex];
    }
    findByDocumentTypeId(documentTypeId: string): CustomerEntity {
      const customerIndex = this.database.findIndex(
        (customer) => customer.documentType.id === documentTypeId
      );
      return this.database[customerIndex];
    }
    findByEmail(email: string): CustomerEntity {
      const customerIndex = this.database.findIndex(
        (customer) => customer.email === email
      );
      return this.database[customerIndex];
    }
    findByState(state: boolean): CustomerEntity[] {
      let arrayState: CustomerEntity[] = [];
      this.database.map((customer) => {
        if (customer.state === state) {
          arrayState.push(customer);
        }
      });
      return arrayState;
    }
  }
