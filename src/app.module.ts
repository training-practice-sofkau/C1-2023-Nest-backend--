import { DocumentTypeRepository } from 'src/data/persistence/repositories';
import { SecurityService } from './business/services/security/security.service';
import { AccountTypeEntity } from './data/persistence/entities/account-type.entity';
import { AccountTypeRepository } from './data/persistence/repositories/account-type.repository';
import { AccountRepository, CustomerRepository } from './data/persistence/repositories';
import { DepositRepository } from './data/persistence/repositories/deposit.repository';
import { DepositService } from './business/services/deposit/deposit.service';
import { TransferRepository } from './data/persistence/repositories';
import { Module } from '@nestjs/common';
import { SecurityController } from './presentation/controllers/security/security.controller';
import { AccountService } from './business/services/account/account.service';
import { UserController } from './presentation/controllers/user/user.controller';
import { CustomerService } from './business/services/customer';
import { AccountController } from './presentation/controllers/account/account.controller';
import { TransferController } from './presentation/controllers/transfer/transfer.controller';
import { DepositController } from './presentation/controllers/deposit/deposit.controller';
import { TransferService } from './business/services/transfer/transfer.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './business/services/security/secret';

@Module({
  imports: [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [UserController, AccountController, TransferController, DepositController, SecurityController],
  providers: [AccountService, AccountRepository, CustomerService, CustomerRepository, TransferService, TransferRepository,
     DepositService, DepositRepository, AccountTypeRepository, AccountTypeEntity, SecurityService, DocumentTypeRepository],
})
export class AppModule { }
