// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerModel } from 'src/data/models';
import {
  AccountTypeEntity,
  CustomerEntity,
  CustomerRepository,
  DocumentTypeEntity,
} from 'src/data/persistence';
import { NewCustomerDTO } from 'src/presentation/dtos/new-customer.dto';
import { NewSignInDTO } from 'src/presentation/dtos/new-signIn.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: NewSignInDTO): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );

    if (answer) {
      const payload = { email: user.email };
      const token = this.jwtService.sign(payload);
      return token;
    } else throw new UnauthorizedException('Datos de identificación inválidos');
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
      console.log('customer.id ', customer.id);
      const account = this.accountService.createAccount(newAccount);

      const payload = { id: customer.id, fullName: customer.fullName };

      const token = this.jwtService.sign(payload);

      if (account) return token;
      else throw new InternalServerErrorException();
    } else throw new InternalServerErrorException();
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): boolean {
    console.log(
      'this.jwtService.verify(JWToken) ',
      this.jwtService.verify(JWToken),
    );
    if (this.jwtService.verify(JWToken)) return true;
    return false;
  }
}
