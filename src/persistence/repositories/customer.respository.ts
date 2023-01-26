import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { BaseRepository } from './base';
import { CustomerRepositoryInterface } from './interfaces';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface
{
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

  findOneByEmailAndPassword(email: string, password: string): boolean {
    throw new Error('Method not implemented.');
  }
  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  findOneByEmail(email: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  findOneByPhone(phone: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  findByState(state: boolean): CustomerEntity[] {
    throw new Error('Method not implemented.');
  }
  findByFullName(fullName: string): CustomerEntity[] {
    throw new Error('Method not implemented.');
  }
}
