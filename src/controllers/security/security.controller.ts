// Libraries
import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { SecurityDto } from 'src/dtos';
import { CustomerEntity, DocumentTypeEntity } from 'src/persistence/entities';
import { CustomerService, SecurityService } from 'src/services';
import { v4 as uuid } from 'uuid';

@Controller('security')
export class SecurityController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly securityService: SecurityService,
  ) {}

  @Post('signIn')
  login(@Body() securityDto: SecurityDto): string {
    let currentCustomer = new CustomerEntity();
    currentCustomer = {
      ...securityDto,
      id: uuid(),
      documentType: new DocumentTypeEntity(),
      document: '',
      fullName: '',
      phone: '',
      state: true,
    };
    return JSON.stringify(this.securityService.signIn(currentCustomer));
  }

  @Post('signOut')
  signOut(): string {
    return 'OK';
  }
}
