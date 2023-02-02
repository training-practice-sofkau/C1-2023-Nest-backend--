import { Controller } from '@nestjs/common';
import { SecurityService } from 'src/business/services/security/security.service';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

}
