import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { DepositDTO } from 'src/dtos';
  import { DepositEntity } from 'src/persistence/entities';
  import { DepositService } from 'src/services';

@Controller('security')
export class SecurityController {

  @Post()
  signUp(@Body() customer: CustomerDTO): CustomerEntity {
    return this.accountService.signUp(customer);
  }  

  @Post()
  signUp(@Body() customer: CustomerDTO): CustomerEntity {
    return this.accountService.signIn(customer);
  }  

}
