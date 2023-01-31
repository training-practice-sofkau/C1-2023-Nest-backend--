import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { AccountService } from '../../services/account/account.service';
import { AccountEntity } from '../../persistence/entities/account.entity';
import { builtinModules } from 'module';


@Controller('account')
export class AccountController {

constructor(private readonly accServices: AccountService ) {}

@Get()
getProduct():AccountEntity[]{
    return this.accServices.findAll();
    }

 @Post()
 createProduct(@Param('id', AccountDTO)productId: string): AccountEntity{
    return this.accServices.crea
 }

}
