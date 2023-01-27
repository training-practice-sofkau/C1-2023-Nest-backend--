import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { DocumentTypeBase } from './base';

@Injectable()
export class DocumentTypeRepository extends DocumentTypeBase<DocumentTypeEntity> {
  constructor() {
    super();
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
