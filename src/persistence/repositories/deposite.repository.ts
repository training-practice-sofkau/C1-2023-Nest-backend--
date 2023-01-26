import { Injectable } from '@nestjs/common';
import { DepositEntity } from '../entities/deposite.entity';
import { BaseRepository } from './base/base.repository';
import { DpositeRepositoryInterface } from './interfaces/deposite.repository.interface';
@Injectable()
export class DepositeRepository extends BaseRepository<DepositEntity> implements DpositeRepositoryInterface {
  register(entity: DepositEntity): DepositEntity {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: DepositEntity): DepositEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): DepositEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): DepositEntity {
    throw new Error('Method not implemented.');
  }
  
}
