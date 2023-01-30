import { Body, Controller, Post } from '@nestjs/common';
import { NewCustomerDTO } from 'src/dtos/new-customer.dto';
import { SecurityService } from 'src/services';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}
  @Post()
  signUp(@Body() signUp: NewCustomerDTO): string {
    return this.securityService.signUp(signUp);
  }

  @Post()
  signIn(@Body() signIn:): string NewCustomerDTO{
    return this.securityService.signIn(signIn);
  }
}
