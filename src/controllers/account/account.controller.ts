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
import { NewAccountDto } from 'src/dtos';
import { AccountService } from 'src/services';
import { AccountEntity } from '../../data/persistence/entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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
