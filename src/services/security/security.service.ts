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
  ) {}

  //Logueo en el sistema
  signIn(user: CustomerModel): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) return 'Falta retornar un JWT';
    else throw new UnauthorizedException('Datos de identificación inválidos');
  }

  //Creacion de una cuenta de ciente con su cuenta bancaria
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
      accountType.id = '4edf3a27-98ef-43ac-b1b9-21976ae00183';
      const newAccount = new AccountEntity();
      newAccount.accountType = accountType;
      newAccount.balance = 0;
      newAccount.customer = newCustomer;
      this.accountService.createAccount(newAccount);
      return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    } else throw new InternalServerErrorException('Error al registrar cliente');
  }

  //Cierre de sesión
  signOut(JWToken: string): void {
    if (!JWToken)
      throw new InternalServerErrorException('Error al cerrar sesión');
  }
}
