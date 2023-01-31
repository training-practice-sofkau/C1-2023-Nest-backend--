import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AccountService } from 'src/business/services';
import { AccountEntity } from 'src/data/persistence/entities';
import { NewAccountDto } from 'src/presentation/dtos';

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
