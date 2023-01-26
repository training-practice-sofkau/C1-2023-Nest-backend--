import { Injectable, NotFoundException } from '@nestjs/common';
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

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const index = this.database.findIndex((item) => item.id === id);

    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as DocumentTypeEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string): void {
    const index = this.database.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new Error('Method is not implemented');
    }
    this.database.splice(index, 1);
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
