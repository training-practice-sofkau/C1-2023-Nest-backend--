import { Injectable } from '@nestjs/common';
import { UpdateCustomerDTO } from '../../dtos';
import { CustomerEntity } from '../../persistence';

@Injectable()
export class CustomerService {
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {UpdateCustomerDTO} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: UpdateCustomerDTO): CustomerEntity {
    throw new Error('Method not implemented.');
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    throw new Error('Method not implemented.');
  }
}
