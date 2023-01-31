import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { CustomerRepository } from './persistence/repositories';
import { CustomerService } from './services/customer';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CustomerService, CustomerRepository],
})
export class AppModule {}
