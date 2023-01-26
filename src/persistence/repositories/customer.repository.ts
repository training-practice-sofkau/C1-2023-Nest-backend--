import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { BaseRepository } from './base';
import { CustomerRepositoryInterface } from './interfaces';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface
{
  constructor() {
    super();
  }
  fingByEmail(email: string): CustomerEntity[] {
    throw new Error('Method not implemented.');
  }
  register(entity: CustomerEntity): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  upate(id: string, entity: CustomerEntity): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): CustomerEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }
}
