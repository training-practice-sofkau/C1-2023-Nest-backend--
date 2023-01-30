import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services/account/account.service';
import { SecurityService } from './services/security/security.service';
import { AccountController } from './controllers/account/account.controller';

@Module({
  imports: [],
  controllers: [SecurityController, AccountController],
  providers: [AccountService, SecurityService],
})
export class AppModule {}
