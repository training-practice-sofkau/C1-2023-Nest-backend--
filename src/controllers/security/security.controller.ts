import { Body, Controller, Post } from '@nestjs/common';
import { NewCustomerDTO } from 'src/dtos';
import { SecurityService } from 'src/services';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}
 //Identificarse en el sistema
  @Post()
  verifyUser(@Body() security: NewCustomerDTO) {
    return this.securityService.signIn(security);
  }
}