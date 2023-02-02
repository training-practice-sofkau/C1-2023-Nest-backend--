import { Body, Controller, Post } from '@nestjs/common';
import { NewSecurityDTO } from 'src/business';
import { SecurityService } from 'src/business/service';
import { NewCustomerDTO } from '../../../business/dtos/new-customer.dto';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}
  //Crear usuario en el sistema
  @Post('newUser')
  signU(@Body() signUp: NewCustomerDTO) {
    this.securityService.signUp(signUp);
  }
  //Identificarse en el sistema
  @Post()
  signIn(@Body() signIn: NewSecurityDTO): string {
    return this.securityService.signIn(signIn);
  }
  //Salir del sistema
}
