import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';

@Injectable()
export class CustomerRepository {
  private readonly database: Array<CustomerEntity>;

  constructor() {
    this.database = new Array<CustomerEntity>();
  }

  register(): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  update(): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  delete(): void {
    throw new Error('This method is not implemented');
  }

  findAll(): CustomerEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(): CustomerEntity {
    throw new Error('This method is not implemented');
  }
}
