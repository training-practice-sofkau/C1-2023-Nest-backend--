import { Body, Controller, Post } from '@nestjs/common';
import { SecurityService } from 'src/services';
import { NewSecurityDTO } from '../../dtos/new-security.dto';
import { CustomerEntity } from '../../persistence/entities/customer.entity';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}
  //Crear usuario en el sistema
  @Post('newUser')
  signU(@Body() signUp: NewSecurityDTO): CustomerEntity {
    return this.securityService.signUp(signUp);
  }
  //Identificarse en el sistema
  @Post()
  signIn(@Body() signIn: NewSecurityDTO): string {
    return this.securityService.signIn(signIn);
  }
  //Salir del sistema
}
