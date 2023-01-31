// Libraries
import { Body, Controller, Get, Post } from '@nestjs/common';
import { newCustomerDTO, NewSecurityDTO, SecurityService } from 'src/data';

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
