import { Body, Controller, Post } from '@nestjs/common';
import { SecurityService } from 'src/business/services/security/security.service';
import { NewCustomerDTO } from 'src/presentation/dtos/new-customer.dto';
import { SignInDTO } from 'src/presentation/dtos/sign-in.dto';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('register')
  signUp(@Body() user: NewCustomerDTO): string {
    return this.securityService.signUp(user);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('signOut')
  signOut(@Body() token: any): boolean {
    return this.securityService.signOut(token.authorization);
  }

  @Post('signIn')
  signIn(@Body() user: SignInDTO): string {
    return this.securityService.signIn(user);
  }
}
