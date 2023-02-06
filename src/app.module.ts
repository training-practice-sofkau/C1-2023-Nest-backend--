import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/';
import { CustomerService } from './business/services/customer/';
import { CustomerRepository } from './data/persistence/repositories/';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CustomerService, CustomerRepository],
})
export class AppModule {}
