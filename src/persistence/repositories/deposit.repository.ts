import { Injectable } from '@nestjs/common';
import { DepositEntity } from 'src/persistence/entities/deposit.entity';

@Injectable()
export class DepositRepository {
  private readonly database: Array<DepositEntity>;

  constructor() {
    this.database = new Array<DepositEntity>();
  }

  register(): DepositEntity {
    throw new Error('This method is not implemented');
  }

  update(): DepositEntity {
    throw new Error('This method is not implemented');
  }

  delete(): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DepositEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(): DepositEntity {
    throw new Error('This method is not implemented');
  }
}
