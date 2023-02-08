//Libraries
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './business/services/security/jwt.strategy';
//Controllers
import {
  AccountsController,
  DepositsController,
  SecurityController,
  TransfersController,
  UsersController,
} from './presentation/controllers';
//Services
import {
  TransferService,
  CustomerService,
  DepositService,
  SecurityService,
  AccountService,
  jwtConstants,
  // jwtConstants,
} from './business/services';
//Repositories
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
  DepositRepository,
  DocumentTypeRepository,
  TransferRepository,
} from './data/persistence/repositories';

@Module({
  controllers: [
    SecurityController,
    UsersController,
    AccountsController,
    TransfersController,
    DepositsController,
  ],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    TransferService,
    SecurityService,
    AccountRepository,
    AccountTypeRepository,
    TransferRepository,
    DepositRepository,
    CustomerRepository,
    DocumentTypeRepository,
    JwtStrategy,
    // JwtService,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.JTW_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  exports: [
    AccountService,
    CustomerService,
    DepositService,
    TransferService,
    SecurityService,
    AccountRepository,
    AccountTypeRepository,
    TransferRepository,
    DepositRepository,
    CustomerRepository,
    DocumentTypeRepository,
    PassportModule,
    JwtModule,
    JwtStrategy,
  ],
})
export class AppModule {}
