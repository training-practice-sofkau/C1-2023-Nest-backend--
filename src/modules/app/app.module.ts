import { Module } from '@nestjs/common';
import { SecurityController } from 'src/controllers';
import { AccountModule } from '../account/account.module';
import { AccountTpModule } from '../accounttp/accounttp.module';
import { DocumentTypeModule } from '../document-type/document-type.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, AccountModule, AccountTpModule, DocumentTypeModule],
  controllers: [SecurityController],
  providers: [],
})
export class AppModule { }
