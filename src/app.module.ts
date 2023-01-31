import { Module } from '@nestjs/common';
import { * } from './presentation/controllers/';
import { * } from './business/services/customer/';
import { * } from './data/persistence/repositories/';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CustomerService, CustomerRepository],
})
export class AppModule {}
