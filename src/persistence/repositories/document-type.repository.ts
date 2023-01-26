import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities/document-type.entity';
import { BaseRepository } from './base/base.repository';
import { DocumentTypeRepositoryInterface } from './interfaces/document-type.repository.interface';

@Injectable()
export class DocumentTypeRepository extends BaseRepository<DocumentTypeEntity> implements DocumentTypeRepositoryInterface {
  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const index = this.database.findIndex(
      (item) => item.id === id,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } 
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
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