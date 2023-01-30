import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/persistence/repositories/customer.repository';
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
    const newCustomer = this.customerRepository.findOneById(customerId);
    return newCustomer;
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
    const UpdCus = this.customerRepository.update(id, customer);
    return UpdCus;
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
    unsubscribe = this.customerRepository.findOneById(id);
    if (unsubscribe.state == true) {
      unsubscribe.state = false;
    }
    return unsubscribe.state;
  }
}
