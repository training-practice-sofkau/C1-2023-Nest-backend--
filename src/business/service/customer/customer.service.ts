import { Injectable } from '@nestjs/common';
import { NewCustomerDTO } from 'src/business/dtos';
import {
  CustomerEntity,
  DocumentTypeEntity,
} from 'src/data/persistence/entities';
import { CustomerRepository } from 'src/data/persistence/repository';

@Injectable()
export class CustomerService {
  constructor(private readonly costumerRepository: CustomerRepository) {}

  transmap(customer: NewCustomerDTO): CustomerEntity {
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

  findAll(): CustomerEntity[] {
    return this.costumerRepository.findAll();
  }

  newCustomer(customer: NewCustomerDTO): CustomerEntity {
    const Customermap = this.transmap(customer);
    return this.costumerRepository.register(Customermap);
    // const documentType = new DocumentTypeEntity();
    // documentType.id = customer.documentTypeId;

    // const newCustomer = new CustomerEntity();
    // newCustomer.documentType = documentType;
    // newCustomer.document = customer.document;
    // newCustomer.fullName = customer.fullName;
    // newCustomer.email = customer.email;
    // newCustomer.phone = customer.phone;
    // newCustomer.password = customer.password;
    //return this.costumerRepository.register(newCustomer);
  }
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.costumerRepository.findOneById(customerId);
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
    const map = this.transmap(customer);
    return this.costumerRepository.update(id, map);
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    let unsubscribe = new CustomerEntity();
    unsubscribe = this.costumerRepository.findOneById(id);
    if (unsubscribe.state) {
      unsubscribe.state = false;
    }
    return unsubscribe.state;
  }
}
