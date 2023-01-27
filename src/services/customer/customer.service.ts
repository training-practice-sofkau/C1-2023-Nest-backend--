import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from 'src/persistence/repositories/customer.respository';
import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';

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
  updatedCustomer(id: string, customer: CustomerModel): CustomerEntity {
    const update = this.customerRepository.update(id, customer);
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
    const customer = this.customerRepository.findOneById(id);
    if (!customer) {
      return true;
    }
    return false;
    /*delete hard, if (customer.deletedAt != undefined) {
      return true;
    }*/
  }
}
