import { Module } from '@nestjs/common';
import { SecurityController } from 'src/controllers';
import { UserController } from 'src/controllers/user/user.controller';
import { AccountService } from 'src/services';

@Module({
  imports: [],
  controllers: [SecurityController, UserController],
  providers: [AccountService],
})
export class AppModule {}
