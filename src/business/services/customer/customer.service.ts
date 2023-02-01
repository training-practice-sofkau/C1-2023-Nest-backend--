import { Injectable } from '@nestjs/common';
import {
  AccountEntity,
  CustomerEntity,
  CustomerRepository,
  DocumentTypeEntity,
} from 'src/data/persistence';
import { NewCustomerDTO } from 'src/presentation/dtos/new-customer.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
  ) {}

  findAll(): CustomerEntity[] {
    return this.customerRepository.findAll();
  }

  newCustomer(customer: NewCustomerDTO): CustomerEntity {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentTypeId;

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;

    //Crear cuenta
    const acco = {
      customer: newCustomer.id,
      accountType: documentType.id,
      balance: 0,
    };
    const account = this.accountService.createAccount(acco);
    account.customer = newCustomer;

    return this.customerRepository.register(newCustomer);
  }

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    const customer = this.customerRepository.findOneById(customerId);
    return customer;
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: NewCustomerDTO): CustomerEntity {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentTypeId;

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;
    const update = this.customerRepository.update(id, newCustomer);
    return update;
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    this.customerRepository.delete(id);
    //const customer = this.customerRepository.findOneById(id);
    //if (customer.deletedAt != undefined) {
    //return true;
    //}
    return false;
    /*delete hard, if (customer.deletedAt != undefined) {
      return true;
    }*/
  }
}
