import { Injectable } from '@nestjs/common';
import { NewCustomerDTO } from 'src/presentation/dtos/new-customer.dto';
import { CustomerModel } from '../../models';
import { CustomerEntity, DocumentTypeEntity } from '../../persistence/entities';
import { CustomerRepository } from '../../persistence/repositories/customer.repository';

@Injectable()
export class CustomerService {
 
  constructor(private readonly customerRepository: CustomerRepository) {}

  findAll():CustomerEntity[]{
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

    return this.customerRepository.register(newCustomer)
  }
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId)
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
    return this.customerRepository.update(id , customer)
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
   let user = new CustomerEntity();
   user = this.customerRepository.findOneById(id);
   if(user.state == true){
    user.state = false;
   }
    return user.state;
  }
}
