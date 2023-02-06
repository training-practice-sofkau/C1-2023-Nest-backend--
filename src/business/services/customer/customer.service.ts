import { Injectable } from '@nestjs/common';
import { CustomerDTO } from 'src/business/dtos';
import { CustomerUpdateDTO } from 'src/business/dtos/update-customer.dto';
import {
  AccountEntity,
  CustomerEntity,
  DocumentTypeEntity,
} from '../../../data/persistence/entities';
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
} from '../../../data/persistence/repositories';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
  ) {}

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    const newCustomer = this.customerRepository.findOneById(customerId);
    return newCustomer;
  }

  findAll(): CustomerEntity[] {
    return this.customerRepository
      .findAll()
      .filter((item) => (item.deletedAt ?? true) === true);
  }

  transform(customer: CustomerDTO): CustomerEntity {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentTypeId;
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;
    return newCustomer;
  }

  newCustomer(customer: CustomerDTO): {
    customer: CustomerEntity;
    account: AccountEntity;
  } {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentTypeId;

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;
    const typeId = 'ab27c9ac-a01c-4c22-a6d6-ce5ab3b79185';
    const account = new AccountEntity();
    account.accountType = this.accountTypeRepository.findOneById(typeId);
    account.customer = newCustomer;
    return {
      customer: this.customerRepository.register(newCustomer),
      account: this.accountRepository.register(account),
    };
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: CustomerUpdateDTO): CustomerEntity {
    if (this.customerRepository.findOneById(id)) {
      const newCustomer = new CustomerEntity();
      newCustomer.document = customer.document;
      newCustomer.fullName = customer.fullName;
      newCustomer.email = customer.email;
      newCustomer.phone = customer.phone;
      return this.customerRepository.update(id, newCustomer);
    }
    return new CustomerEntity();
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsuscribe(id: string): boolean {
    if (this.customerRepository.findOneById(id).deletedAt === undefined) {
      const customer = this.customerRepository.findOneById(id);
      customer.state = false;
      this.customerRepository.update(id, customer);
      return true;
    }
    return false;
  }

  deleteCustomer(id: string): boolean {
    if (this.customerRepository.findOneById(id).deletedAt === undefined) {
      this.customerRepository.delete(id, true);
      return true;
    }
    return false;
  }
}
