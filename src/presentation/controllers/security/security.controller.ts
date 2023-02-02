import { Body, Controller, Post } from '@nestjs/common';
import { CustomerDTO } from '../../../business/dtos';
import { SecurityService } from '../../../business/services';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post()
  signUp(@Body() customer: CustomerDTO): string {
    return this.securityService.signUp(customer);
  }

  @Post()
  signIn(@Body() customer: CustomerDTO): string {
    return this.securityService.signIn(customer);
  }
}