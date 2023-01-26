import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { DocumentTypeRepositoryInterface } from './interfaces/document-type.repository.interface';

@Injectable()
export class DocumentTypeRepository extends BaseRepository<DocumentTypeEntity> implements DocumentTypeRepositoryInterface {
  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
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