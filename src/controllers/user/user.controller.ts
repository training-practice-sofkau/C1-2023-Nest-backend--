import { Controller, Get } from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerEntity } from '../../persistence/entities/customer.entity';

@Controller('user')
export class UserController {

    constructor(private readonly customerService: CustomerService){}

    @Get()
    findAllUser(): CustomerEntity[] {
        return this.customerService.findAll();
    }
}





