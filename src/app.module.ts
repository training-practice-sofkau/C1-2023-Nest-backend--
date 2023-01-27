import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services/account/account.service';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [AccountService],
})
export class AppModule {}
