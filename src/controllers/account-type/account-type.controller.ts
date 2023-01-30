import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewAccountTypeDTO } from 'src/dtos/new-account-type.dto';
import { AccountTypeEntity } from 'src/persistence';
import { AccountTypeService } from 'src/services/account-type/account-type.service';

@Controller('account-type')
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) {}

  @Get()
  findAllAccounts(): AccountTypeEntity[] {
    console.log('entra en get');
    return this.accountTypeService.findAll();
  }

  @Post()
  registerAccount(@Body() account: NewAccountTypeDTO): AccountTypeEntity {
    return this.accountTypeService.newAccountType(account);
  }
}
