import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerModel } from 'src/models';
import {
  AccountEntity,
  AccountTypeEntity,
  CustomerEntity,
} from 'src/persistence/entities';
import { CustomerRepository } from 'src/persistence/repositories';
import { AccountService } from 'src/services';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
  ) { }

  async signIn(user: CustomerModel): Promise<string> {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) return 'Falta retornar un JWT';
    else throw new UnauthorizedException('Datos de identificación inválidos');
  }

  //Creacion de una cuenta de ciente con su cuenta bancaria
  async signUp(user: CustomerModel): Promise<string> {
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
      accountType.id = '40ef7565-ea87-4560-b9a3-e2b70540355e';
      const newAccount = new AccountEntity();
      newAccount.acountType = accountType;
      newAccount.balance = 0;
      newAccount.customer = newCustomer;
      this.accountService.createAccount(newAccount);
      return 'Falta retornar un JWT';
    } else throw new InternalServerErrorException('Error al registrar cliente');
  }

  signOut(JWToken: string): void {
    if (JWToken)
      throw new InternalServerErrorException('Error al registrar cliente');
  }
}
