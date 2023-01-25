import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { CustomerBase } from './base';

@Injectable()
export class CustomerRepository extends CustomerBase<CustomerEntity> {
  constructor() {
    super();
  }
  register(entity: CustomerEntity): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): CustomerEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): CustomerEntity {
    throw new Error('This method is not implemented');
  }
}
