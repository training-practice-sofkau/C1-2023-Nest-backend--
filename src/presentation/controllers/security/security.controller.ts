// Libraries
import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewCustomerDTO } from 'src/business/dtos/new-customer.dto';
import { SignDTO } from 'src/business/dtos/new_sing.dto';
import { SecurityService } from 'src/business/services/security/security.service';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('sign-up')
  signUp(@Body() customer: NewCustomerDTO) {
    return this.securityService.signUp(customer);
  }

  @Post('sign-in')
  signIn(@Body() customer: SignDTO) {
    return this.securityService.signIn(customer);
  }

  @Get('logout')
  logout(@Body() body: { JWT: string }): boolean {
    return this.securityService.signOut(body.JWT);
  }
}