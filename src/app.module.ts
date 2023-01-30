import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { CustomerRepository } from './persistence/repositories';
import { CustomerService } from './services';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CustomerService, CustomerRepository],
})
export class AppModule {}
