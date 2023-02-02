// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

// Models
import { CustomerModel } from '../../models';

// Repositories
import { CustomerRepository } from '../../persistence/repositories';

// Services
import { AccountService } from '../account';

// Entities
import { AccountTypeEntity, CustomerEntity } from '../../persistence/entities';
import { AccountEntity } from 'src/persistence/entities';

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
  signUp(user: CustomerModel): string {
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = user.documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      const accountType = new AccountTypeEntity();
      const newAccount = new AccountEntity();
      accountType.id = 'ab27c9ac-a01c-4c22-a6d6-ce5ab3b79185';
      newAccount.customer = customer;
      newAccount.accountType = accountType;

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
