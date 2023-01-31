import { Injectable } from '@nestjs/common';
import { CustomerDTO } from 'src/business/dtos';
import { CustomerEntity, DocumentTypeEntity } from '../../persistence/entities';
import { CustomerRepository } from '../../persistence/repositories';

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
    return this.customerRepository.findAll();
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
  updatedCustomer(id: string, customer: CustomerDTO): CustomerEntity {
    if (this.customerRepository.findOneById(id)) {
      const documentType = new DocumentTypeEntity();
      documentType.id = customer.documentTypeId;
      const newCustomer = new CustomerEntity();
      newCustomer.documentType = documentType;
      newCustomer.document = customer.document;
      newCustomer.fullName = customer.fullName;
      newCustomer.email = customer.email;
      newCustomer.phone = customer.phone;
      newCustomer.password = customer.password;
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
  unsubscribe(id: string): boolean {
    if (this.customerRepository.findOneById(id).deletedAt === undefined) {
      this.customerRepository.delete(id, true);
      return true;
    }
    return false;
  }
}
