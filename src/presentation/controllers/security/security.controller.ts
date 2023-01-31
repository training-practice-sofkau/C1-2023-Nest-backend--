import { Body, Controller, Post } from '@nestjs/common';
import { SecurityService } from 'src/business/services';
import { NewCustomerDTO } from 'src/presentation/dtos';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}
  //Identificarse en el sistema
  @Post()
  verifyUser(@Body() security: NewCustomerDTO) {
    return this.securityService.signIn(security);
  }
}
