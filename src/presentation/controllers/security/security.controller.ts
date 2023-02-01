// Libraries
import { Param } from '@nestjs/common';
import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { SecurityDto } from 'src/business/dtos';
import { CustomerService, SecurityService } from 'src/business/services';

@Controller('security')
export class SecurityController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly securityService: SecurityService,
  ) {}

  @Post('signIn')
  signIn(@Body() securityDto: SecurityDto): JSON {
    return JSON.parse(this.securityService.signIn(securityDto));
  }

  @Post('signout:token')
  signOut(@Param('token') token: string): string {
    this.securityService.signOut(token);
    return 'OK';
  }
}
