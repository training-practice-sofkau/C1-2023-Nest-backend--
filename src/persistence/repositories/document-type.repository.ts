import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base';
import { DocumentTypeRepositoryInterface } from './interfaces';

@Injectable()
export class DocumentTypeRepository
  extends BaseRepository<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface
{
  constructor() {
    super();
  }
  findDocumentTypeByState(State: boolean): DocumentTypeEntity[] {
    throw new Error('Method not implemented.');
  }
  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('Method not implemented.');
  }
  upate(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): DocumentTypeEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): DocumentTypeEntity {
    throw new Error('Method not implemented.');
  }
}
