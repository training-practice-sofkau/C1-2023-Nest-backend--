import { Module } from '@nestjs/common';
import { SecurityController } from 'src/controllers';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, AccountModule],
  controllers: [SecurityController],
  providers: [],
})
export class AppModule { }
