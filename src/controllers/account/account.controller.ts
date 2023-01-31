import { CustomerService } from './../../services/customer/customer.service';
import { Controller, Get } from '@nestjs/common';

@Controller('account')
export class AccountController {
  constructor(private readonly CustomerService: CustomerService) {}
}
