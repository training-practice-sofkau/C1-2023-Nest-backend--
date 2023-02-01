import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateAccountDto,
  CreateCustomerDto,
  SecurityDto,
} from 'src/business/dtos';
import { CustomerEntity } from 'src/data/persistence/entities';
import {
  CustomerRepository,
  DocumentTypeRepository,
} from 'src/data/persistence/repositories';
import { AccountService, jwtConstants } from 'src/business/services';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly documentTypeRepository: DocumentTypeRepository,
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  //Logueo en el sistema
  signIn(securityDto: SecurityDto): string {
    const { password, email, fullName, id, document, phone, ...answer } =
      this.customerRepository.findOneByEmail(securityDto.email);
    if (answer)
      if (compareSync(securityDto.password, password)) {
        return JSON.stringify({
          email,
          fullName,
          id,
          document,
          phone,
          token: this.jwt(id),
        });
      }
    throw new UnauthorizedException('Datos de identificación inválidos');
  }

  //Creacion de una cuenta de ciente con su cuenta bancaria
  signUp(user: CreateCustomerDto): string {
    const { password } = user;
    const newCustomer = new CustomerEntity();
    const currentDocumentType = this.documentTypeRepository.findOneById(
      user.documentTypeId,
    );
    newCustomer.documentType = currentDocumentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = hashSync(password, 10);
    newCustomer.avatarUrl =
      user.avatarUrl ??
      'https://www.pngkey.com/png/full/54-547425_logo-one-piece-png-best-logos-of-one.png';
    const customer = this.customerRepository.register(newCustomer);
    if (customer) {
      const newAccountDto = <CreateAccountDto>{
        accountTypeId: '4edf3a27-98ef-43ac-b1b9-21976ae00183',
        customerId: customer.id,
      };
      const { id, fullName, email, document, phone, avatarUrl } = customer;
      this.accountService.createAccount(newAccountDto);
      return JSON.stringify({
        id,
        fullName,
        email,
        document,
        phone,
        avatarUrl,
        token: this.jwt(id),
      });
    }
    throw new InternalServerErrorException('Error al registrar cliente');
  }

  //Cierre de sesión
  signOut(JWToken: string): void {
    if (!JWToken)
      throw new InternalServerErrorException('Error al cerrar sesión');
  }

  private jwt(payload: string): string {
    return this.jwtService.sign(
      { id: payload },
      {
        secret: jwtConstants.secret,
        expiresIn: 2 * 60 * 60,
      },
    );
  }
}
