// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerModel } from 'src/data/models';
import {
  AccountTypeEntity,
  CustomerEntity,
  CustomerRepository,
  DocumentTypeEntity,
} from 'src/data/persistence';
import { NewCustomerDTO } from 'src/presentation/dtos/new-customer.dto';
import { v4 as uuid2 } from 'uuid';
import { AccountService } from '../account/account.service';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: CustomerModel): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) return 'Falta retornar un JWT';
    else throw new UnauthorizedException('Datos de identificación inválidos');
  }

  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: NewCustomerDTO): string {
    const documentType = new DocumentTypeEntity();
    documentType.id = user.documentTypeId;

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      const accountType = new AccountTypeEntity();
      //accountType.id = newCustomer;
      const newAccount = {
        customer: customer.id,
        accountType: accountType.id,
        balance: 0, //no estaba
      };

      const account = this.accountService.createAccount(newAccount);
      if (account) return 'Falta retornar un JWT';
      else throw new InternalServerErrorException();
    } else throw new InternalServerErrorException();
  }

  /**
   *  //Crear cuenta
    const acco = {
      customer: newCustomer.id,
      accountType: documentType.id,
      balance: 0,
    };
    const account = this.accountService.createAccount(acco);
    account.customer = newCustomer;

    return this.customerRepository.register(newCustomer);
   */

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {
    throw new Error('Method not implemented.');
  }
}
