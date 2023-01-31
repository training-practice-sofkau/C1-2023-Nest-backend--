import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAccountDto, CreateCustomerDto } from 'src/dtos';
import { CustomerEntity } from 'src/data/persistence/entities';
import {
  CustomerRepository,
  DocumentTypeRepository,
} from 'src/data/persistence/repositories';
import { AccountService } from 'src/services';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly documentTypeRepository: DocumentTypeRepository,
    private readonly accountService: AccountService,
  ) {}

  //Logueo en el sistema
  signIn(password: string, email: string): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      email,
      password,
    );
    if (answer)
      return JSON.stringify({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      });
    throw new UnauthorizedException('Datos de identificación inválidos');
  }

  //Creacion de una cuenta de ciente con su cuenta bancaria
  signUp(user: CreateCustomerDto): string {
    const newCustomer = new CustomerEntity();
    const currentDocumentType = this.documentTypeRepository.findOneById(
      user.documentTypeId,
    );
    newCustomer.documentType = currentDocumentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;
    newCustomer.avatarUrl = user.avatarUrl;
    const customer = this.customerRepository.register(newCustomer);
    if (customer) {
      const newAccountDto = <CreateAccountDto>{
        accountTypeId: '4edf3a27-98ef-43ac-b1b9-21976ae00183',
        customerId: customer.id,
      };
      this.accountService.createAccount(newAccountDto);
      return JSON.stringify({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      });
    }
    throw new InternalServerErrorException('Error al registrar cliente');
  }

  //Cierre de sesión
  signOut(JWToken: string): void {
    if (!JWToken)
      throw new InternalServerErrorException('Error al cerrar sesión');
  }
}
