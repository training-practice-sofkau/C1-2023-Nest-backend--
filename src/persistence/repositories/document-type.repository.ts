import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class DocumentTypeRepository
  implements BaseRepository<DocumentTypeEntity>
{
  private readonly database: Array<DocumentTypeEntity>;

  constructor() {
    this.database = new Array<DocumentTypeEntity>();
  }

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }
}
