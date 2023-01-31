// Libraries
import { Body, Controller, Get, Post } from '@nestjs/common';
import { newCustomerDTO } from 'src/dtos/customer/new-customer.dto';
import { NewSecurityDTO } from 'src/dtos/security/new-security.dto';
import { SecurityService } from 'src/services';

@Controller('security')
export class SecurityController {
    constructor( private readonly securityService:SecurityService){}

    @Post()
    verifyCustomer(@Body() security:NewSecurityDTO){
        this.securityService.signIn(security)
    }

    @Post("/register")
    createCustomer(@Body() customer:newCustomerDTO){
        return this.securityService.signUp(customer)
    }
}
