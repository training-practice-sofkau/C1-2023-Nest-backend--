// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

// Repositories
import {
  CustomerRepository,
  DocumentTypeRepository,
} from '../../../data/persistence/repositories';

// Services
import { AccountService } from '../account';

// Entities
import {
  AccountTypeEntity,
  CustomerEntity,
} from '../../../data/persistence/entities';
import { AccountDTO, CustomerDTO } from 'src/business/dtos';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly documentTypeRepository: DocumentTypeRepository,
    private readonly accountService: AccountService,
  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: CustomerDTO): string {
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
  signUp(user: CustomerDTO): string {
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = this.documentTypeRepository.findOneById(
      user.documentTypeId,
    );
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      const accountType = new AccountTypeEntity();
      const newAccount = new AccountDTO();
      accountType.id = 'ab27c9ac-a01c-4c22-a6d6-ce5ab3b79185';
      newAccount.customerId = customer.id;
      newAccount.accountTypeId = customer.documentType.id;

      const account = this.accountService.createAccount(newAccount);

      if (account) return 'Falta retornar un JWT';
      else throw new InternalServerErrorException();
    } else throw new InternalServerErrorException();
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
