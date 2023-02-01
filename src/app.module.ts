import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user/user.controller';
import { CustomerService } from './business/service/customer/customer.service';
import { CustomerRepository } from './data/persistence/repository/customer.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CustomerService, CustomerRepository],
})
export class AppModule {}
