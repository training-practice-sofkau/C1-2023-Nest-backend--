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

  //Retorna todos los clientes
  getAll(): CustomerEntity[] {
    return this.customerRepository.findAll();
  }

  //Retorna la informacion del cliente solicitado
  getCustomerInfo(customerId: string): CustomerEntity {
    const currentCustomer = this.customerRepository.findOneById(customerId);
    return currentCustomer;
  }

  //Actualiza informacion del ususario solicitado
  updatedCustomer(customerId: string, customer: CustomerModel): CustomerEntity {
    return this.customerRepository.upate(customerId, customer);
  }

  //Elimina el usuario solicitado de forma logica
  unsubscribe(customerId: string): boolean {
    const currentAccounts = this.accountRepository.findByCustomer(customerId);
    currentAccounts.forEach((a) => this.accountService.deleteAccount(a.id));
    const ok = this.customerRepository.findOneById(customerId);
    return ok ? true : false;
  }
}
