import { Injectable } from '@nestjs/common';
import { DespositEntity } from '../entities/deposit.entity';
import { BaseRepository } from './base/base.repository';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';

@Injectable()
export class DepositRepository
  extends BaseRepository<DespositEntity>
  implements BaseRepositoryInterface<DespositEntity>
{
  register(entity: DespositEntity): DespositEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DespositEntity): DespositEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DespositEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): DespositEntity {
    throw new Error('This method is not implemented');
  }
}
