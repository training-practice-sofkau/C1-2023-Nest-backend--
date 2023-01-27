import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { AccountService } from './services/account/account.service';
import { SecurityService } from './services/security/security.service';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [AccountService, SecurityService],
})
export class AppModule {}
