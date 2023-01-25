import { Injectable } from '@nestjs/common';
import { depositEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { BaseRepositoryInterface } from './interfaces/base/base-repository.interface';

@Injectable()
export class depositRepository
  extends BaseRepository<depositEntity>
  implements BaseRepositoryInterface<depositEntity>
{
  register(entity: depositEntity): depositEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: depositEntity): depositEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): depositEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): depositEntity {
    throw new Error('This method is not implemented');
  }
}
