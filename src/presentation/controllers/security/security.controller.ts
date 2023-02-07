// Libraries
import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CreateCustomerDto, SecurityDto } from 'src/business/dtos';
import { SecurityService } from 'src/business/services';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('signup')
  registerUser(@Body() createCustomerDto: CreateCustomerDto): JSON {
    return JSON.parse(this.securityService.signUp(createCustomerDto));
  }

  @Post('signin')
  signIn(@Body() securityDto: SecurityDto): JSON {
    return JSON.parse(this.securityService.signIn(securityDto));
  }

  @Post('signout')
  signOut(@Headers('Authorization') token: string): string {
    this.securityService.signOut(token);
    return 'OK';
  }
}
