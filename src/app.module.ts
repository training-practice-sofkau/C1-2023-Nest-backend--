import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { CustomerService } from './services/customer/customer.service';
import { CustomerRepository } from './persistence/repositories/customer.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CustomerService, CustomerRepository],
})
export class AppModule {}
