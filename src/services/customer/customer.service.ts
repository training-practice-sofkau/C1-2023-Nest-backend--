import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerModel } from 'src/models';
import { CustomerEntity } from 'src/persistence/entities';
import { AccountRepository } from 'src/persistence/repositories/account.repository';
import { CustomerRepository } from 'src/persistence/repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId);
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
    return this.updatedCustomer(id, customer);
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    const account = this.accountRepository.findByCustomerId(id);
    const customer = this.customerRepository.findOneById(id);
    if (account) {
      throw new BadRequestException(
        'No se puede realizar esta operacion el Usuario tiene cuenta asociada',
      );
    } else {
      if (customer.deletedAt === undefined) {
        this.customerRepository.delete(id, true);
        return false;
      } else {
        this.customerRepository.delete(id, false);
        return true;
      }
    }
  }
}
