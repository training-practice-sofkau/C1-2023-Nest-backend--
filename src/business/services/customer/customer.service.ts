import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from 'src/business/dtos';
import { CustomerEntity } from 'src/data/persistence/entities';
import { CustomerRepository } from 'src/data/persistence/repositories';
import { AccountService } from '../account';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
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
  updateCustomer(
    customerId: string,
    customer: UpdateCustomerDto,
  ): CustomerEntity {
    const currentCustomer = this.customerRepository.findOneById(customerId);
    let updatedCustomer = new CustomerEntity();
    updatedCustomer = {
      ...currentCustomer,
      ...customer,
      id: customerId,
    };
    return this.customerRepository.upate(customerId, updatedCustomer);
  }

  //Elimina el usuario solicitado de forma logica
  unsubscribe(customerId: string): boolean {
    const currentAccounts =
      this.accountService.getAccountsByCustomer(customerId);
    currentAccounts.forEach((a) => this.accountService.deleteAccount(a.id));
    return true;
  }

  //Cambiar estado de Cliente si está inactivo lo activa o viceversa
  changeState(customerId: string): boolean {
    const currentCustomer = this.getCustomerInfo(customerId);
    currentCustomer.state = !currentCustomer.state;
    const updatedCustomer = this.customerRepository.upate(
      customerId,
      currentCustomer,
    );
    if (updatedCustomer) return true;
    return false;
  }
}
