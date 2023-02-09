import { Body, Controller, Post } from '@nestjs/common';
import { NewSecurityDTO } from 'src/business';
import { SecurityService } from 'src/business/service';
import { NewCustomerDTO } from '../../../business/dtos/new-customer.dto';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}
  //Crear usuario en el sistema
  @Post('newUser')
  signU(@Body() signUp: NewCustomerDTO): { access_token: string } {
    return this.securityService.signUp(signUp);
  }
  //Identificarse en el sistema
  @Post('login')
  signIn(@Body() signIn: NewSecurityDTO): { access_token: string } {
    return this.securityService.signIn(signIn);
  }
  //Salir del sistema
}
