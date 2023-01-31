import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AccountService } from 'src/services';
import { AccountEntity } from '../../persistence/entities/account.entity';
import { NewAccountDto } from '../../dtos/account/new-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAccounts(): AccountEntity[] {
    return this.accountService.findAll();
  }

  @Get()
  getAccount(@Param('id', new ParseUUIDPipe()) id: string): AccountEntity {
    return this.accountService.findOneById(id);
  }

  @Post()
  create(@Body() account: NewAccountDto): AccountEntity {
    return this.accountService.createAccount(account);
  }

  @Put()
  modifyAccount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() account: NewAccountDto,
  ): AccountEntity {
    return this.accountService.updateAccount(id, account);
  }

  @Delete()
  deleteAccount(@Param('id', new ParseUUIDPipe()) id: string): void {
    return this.accountService.deleteAccount(id);
  }
}
