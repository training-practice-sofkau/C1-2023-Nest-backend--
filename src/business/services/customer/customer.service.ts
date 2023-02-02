<<<<<<< HEAD:src/services/customer/customer.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';
import { AccountRepository, CustomerRepository } from 'src/persistence/repositories';
=======
import { Injectable } from '@nestjs/common';
import { UpdateCustomerDTO } from '../../dtos';
import { CustomerEntity } from '../../persistence';

>>>>>>> ce0c2b8e7f614be9e53400ebc5dbbf0ba6ffd7e0:src/business/services/customer/customer.service.ts
@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository : CustomerRepository,
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
   * @param {UpdateCustomerDTO} customer
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
    const account = this.accountRepository.findByCustomer(id);
    if (account) {
      throw new BadRequestException('El usuario tiene cuenta asociada');
    } else {
      const customer = this.customerRepository.findOneById(id);
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