import { Injectable } from '@nestjs/common';
import { TransferEntity } from '../entities/transfer.entity';

@Injectable()
export class TransferRepository {
  private readonly database: Array<TransferEntity>;

  constructor() {
    this.database = new Array<TransferEntity>();
  }

  register(): TransferEntity {
    throw new Error('This method is not implemented');
  }

  update(): TransferEntity {
    throw new Error('This method is not implemented');
  }

  delete(): void {
    throw new Error('This method is not implemented');
  }

  findAll(): TransferEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(): TransferEntity {
    throw new Error('This method is not implemented');
  }
}
