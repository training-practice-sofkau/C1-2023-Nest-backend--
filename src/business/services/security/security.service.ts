import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountTypeEntity, CustomerEntity, CustomerRepository, DocumentTypeEntity } from 'src/data/persistence';
import { NewAccountDTO, newCustomerDTO, NewSecurityDTO } from 'src/business/dtos';
import { AccountService } from '../account';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
  ) { }

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: NewSecurityDTO): string {
    const answer = this.customerRepository.findEmailAndPassword(
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
  signUp(user: newCustomerDTO): string {
    const newCustomer = new CustomerEntity();
    const newDocumentType = new DocumentTypeEntity()
    newDocumentType.id = uuid();
    const findCustomer = this.customerRepository.findByEmail(user.email);
    if (findCustomer) {
      throw new BadRequestException();
    } else {
      newCustomer.documentType = newDocumentType;
      newCustomer.document = user.document;
      newCustomer.fullName = user.fullName;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;

      const customer = this.customerRepository.register(newCustomer);

      if (customer) {
        const accountType = new AccountTypeEntity();
        accountType.id = uuid();
        const newAccount = new NewAccountDTO();
        newAccount.customer = customer.id;
        newAccount.accountType = accountType.id;

        const account = this.accountService.createAccount(newAccount);

        if (account) return 'Falta retornar un JWT, se creo una cuenta con ID: ' + account.id;
        else throw new InternalServerErrorException();
      } else throw new InternalServerErrorException();
    }
  }

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
