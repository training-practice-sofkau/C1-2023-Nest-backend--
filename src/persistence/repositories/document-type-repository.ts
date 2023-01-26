import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';

@Injectable()
export class DocumentTypeRepository {
  private readonly database: Array<DocumentTypeEntity>;

  constructor() {
    this.database = new Array<DocumentTypeEntity>();
  }

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }

  delete(): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }
  findByState(): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findByName(): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }
}
