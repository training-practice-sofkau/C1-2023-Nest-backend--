import { Injectable } from '@nestjs/common';
import { CustomerModel } from 'src/models';
import { CustomerEntity } from 'src/persistence/entities';
import {
  AccountRepository,
  CustomerRepository,
} from 'src/persistence/repositories';
import { AccountService } from '../account';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountRepository: AccountRepository,
    private readonly accountService: AccountService,
  ) {}

  getCustomerInfo(customerId: string): CustomerEntity {
    const currentCustomer = this.customerRepository.findOneById(customerId);
    return currentCustomer;
  }

  updatedCustomer(customerId: string, customer: CustomerModel): CustomerEntity {
    return this.customerRepository.upate(customerId, customer);
  }

  unsubscribe(customerId: string): boolean {
    const currentAccounts = this.accountRepository.findByCustomer(customerId);
    currentAccounts.forEach((a) => this.accountService.deleteAccount(a.id));
    const ok = this.customerRepository.findOneById(customerId);
    return ok ? true : false;
  }
}
