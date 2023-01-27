import { Injectable } from '@nestjs/common';
import { CustomerModel } from 'src/models';
import { CustomerEntity } from 'src/persistence/entities';
import { CustomerRepository } from 'src/persistence/repositories';
import { AccountService } from '../account';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
  ) {}

  getCustomerInfo(customerId: string): CustomerEntity {
    const currentCustomer = this.customerRepository.findOneById(customerId);
    return currentCustomer;
  }

  updatedCustomer(customerId: string, customer: CustomerModel): CustomerEntity {
    return this.customerRepository.upate(customerId, customer);
  }

  unsubscribe(id: string): boolean {
    throw new Error('Method not implemented.');
  }
}
