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

@Controller('deposit')
export class DepositController {

    @Post()
    createDeposit(@Body() account: DepositDTO): DepositEntity {
      return this.accountService.createAccount(account);
    }

    @Delete()
    deleteDeposit(@Body() despositId: string): void {
      this.accountService.deleteAccount(despositId);
    }

}
