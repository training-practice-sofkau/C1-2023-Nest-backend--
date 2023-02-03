import { Body, Controller, Get, Post } from '@nestjs/common';
import { SecurityService } from '../../../business/services';
import { CustomerDTO, SignDTO } from '../../../business/dtos';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('sign-up')
  signUp(@Body() customer: CustomerDTO) {
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
