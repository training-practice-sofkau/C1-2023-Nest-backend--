import { Module } from '@nestjs/common';
import { SecurityController } from 'src/controllers';
import { AccountController } from 'src/controllers/account/account.controller';
import { UserController } from 'src/controllers/user/user.controller';
import { AccountService } from 'src/services';

@Module({
  imports: [],
  controllers: [SecurityController, UserController,AccountController],
  providers: [AccountService],
})
export class AppModule {}
