import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerModel } from 'src/data/models';
import { CustomerEntity } from 'src/data/persistence/entities';
import { AccountRepository, CustomerRepository } from 'src/data/persistence/repositories';
import { NewCustomerDTO } from 'src/business/dtos/new-customer.dto';
import { DocumentTypeEntity } from 'src/data/persistence/entities';
import { AccountEntity } from 'src/data/persistence/entities/account.entity';
@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository : CustomerRepository,
    private readonly accountRepository: AccountRepository,
    ) {}

    findAll(): CustomerEntity[] {
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

      let newAccount = new AccountEntity();
      newAccount.balance = 0;
      newAccount.customer = newCustomer;
      this.accountRepository.register(newAccount)
      return this.customerRepository.register(newCustomer);

      }
    
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
  updateCustomer(id: string, customer: NewCustomerDTO): CustomerEntity {
    const map = this.newCustomer(customer);
    return this.customerRepository.update(id, map);
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