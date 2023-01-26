import { CustomerEntity } from '../entities/customer.entity';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base/base.repository';

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
