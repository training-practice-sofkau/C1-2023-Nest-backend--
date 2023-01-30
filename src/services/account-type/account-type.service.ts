import { Injectable } from '@nestjs/common';
import { NewAccountTypeDTO } from 'src/dtos/new-account-type.dto';
import { AccountTypeEntity } from 'src/persistence';
import { AccountTypeRepository } from 'src/persistence/repositories/account-type.repository';

@Injectable()
export class AccountTypeService {
  constructor(private readonly accountRepository: AccountTypeRepository) {}

  findAll(): AccountTypeEntity[] {
    return this.accountRepository.findAll();
  }

  newAccountType(accountType: NewAccountTypeDTO): AccountTypeEntity {
    const newAccountType = new AccountTypeEntity();
    newAccountType.name = accountType.name;

    return this.accountRepository.register(newAccountType);
  }

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  /*getCustomerInfo(customerId: string): CustomerEntity {
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
  /* updatedCustomer(id: string, customer: NewCustomerDTO): CustomerEntity {
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
  }*/
}
