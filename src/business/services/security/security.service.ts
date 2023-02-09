import { JwtService } from '@nestjs/jwt';
// Libraries
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

// Models
import { CustomerModel } from 'src/data/models';

// Repositories
import { CustomerRepository, DocumentTypeRepository } from 'src/data/persistence/repositories';

// Services
import { AccountService } from '../account/account.service';

// Entities
import { CustomerEntity, DocumentTypeEntity } from 'src/data/persistence/entities';
import { NewAccountDTO } from 'src/business/dtos/new-account.dto';
import { NewCustomerDTO } from 'src/business/dtos/new-customer.dto';
import { SignDTO } from 'src/business/dtos/new_sing.dto';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly documentTypeRepository: DocumentTypeRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */

  signIn(user: SignDTO) {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) {
      const customer = this.customerRepository.findOneByEmail(
        user.email);
      const payload = { email: customer.email, sub: customer.id };
      return { access_token: this.jwtService.sign(payload) };
    } else throw new UnauthorizedException('Datos de identificación inválidos');
  }
  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: NewCustomerDTO){
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
      const newAccount = new NewAccountDTO();
      newAccount.Customer = customer.id;
      newAccount.accountType = "d8d0be69-27ae-4898-8fcd-37669ff45a13";

      const account = this.accountService.createAccount(newAccount);

      if (account) {
        const payload = { email: customer.email, sub: customer.id };
        return { access_token: this.jwtService.sign(payload) };
      } else
        throw new UnauthorizedException('Datos de identificación inválidos');
    } else throw new InternalServerErrorException();
  }
  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWT: string): boolean {
    if (this.jwtService.verify(JWT)) return true;

    return false;
  }
}
