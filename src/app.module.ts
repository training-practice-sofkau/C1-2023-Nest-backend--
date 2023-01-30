import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services/account/account.service';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [],
  controllers: [SecurityController, UserController],
  providers: [AccountService],
})
export class AppModule {}
