import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/customer/customer.controller';
import { CustomerService } from 'src/services/customer/customer.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
