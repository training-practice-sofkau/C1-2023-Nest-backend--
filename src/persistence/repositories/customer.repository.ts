import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { CustomerRepositoryInterface } from './interface/customer/customer-repository.interface';

@Injectable()
export class CustomerRepository
  extends BodyRepositoryAbstract<CustomerEntity>
  implements CustomerRepositoryInterface {
    register(entity: CustomerEntity): CustomerEntity {
      throw new Error('This method is not implemented');
    }
    update(id: string, entity: CustomerEntity): CustomerEntity {
      throw new Error('This method is not implemented');
    }
    delete(id: string, soft?: boolean | undefined): void {
      throw new Error('This method is not implemented');
    }
    findAll(): CustomerEntity[] {
      throw new Error('This method is not implemented');
    }
    findOneById(id: string): CustomerEntity {
      throw new Error('This method is not implemented');
    }
  }
