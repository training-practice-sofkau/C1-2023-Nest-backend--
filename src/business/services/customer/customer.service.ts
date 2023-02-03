import { Injectable } from '@nestjs/common';
import { CustomerDTO } from 'src/business/dtos';
import { CustomerUpdateDTO } from 'src/business/dtos/update-customer.dto';
import {
  CustomerEntity,
  DocumentTypeEntity,
} from '../../../data/persistence/entities';
import { CustomerRepository } from '../../../data/persistence/repositories';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

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

  newCustomer(customer: CustomerDTO): CustomerEntity {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentTypeId;

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;

    return this.customerRepository.register(newCustomer);
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
