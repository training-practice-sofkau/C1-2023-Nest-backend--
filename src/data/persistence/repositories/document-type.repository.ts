import { Injectable } from '@nestjs/common';
import { RepositoryBase } from './base';
import { DocumentTypeEntity } from '../entities';
import { IDocumentTypeRepository } from './interfaces';

@Injectable()
export class DocumentTypeRepository
  extends RepositoryBase<DocumentTypeEntity>
  implements IDocumentTypeRepository
{
  findByState(state: boolean): DocumentTypeEntity[] {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): DocumentTypeEntity[] {
    throw new Error('Method not implemented.');
  }

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
