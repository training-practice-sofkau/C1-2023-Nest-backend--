import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { DocumentTypeRepositoryInterface } from './interfaces/document-type-repository.interface';

@Injectable()
export class DocumentTypeRepository
  extends BaseRepository<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface
{
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

  delete(id: string, soft?: boolean): void {
    const doc = this.findOneById(id);
    if (soft || soft === undefined) {
      this.update(id, doc);
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      this.database.splice(index, 1);
    }
  }

  findAll(): DocumentTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): DocumentTypeEntity {
    const doc = this.database.find((item) => item.id === id);
    if (doc) return doc;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    const status = this.database.filter((item) => item.state == state);
    return status;
  }

  findByName(name: string): DocumentTypeEntity[] {
    const firsname = this.database.filter((item) => item.name == name);
    return firsname;
  }
}

//[Workshop Week 1 - Day 3] - Manipulación de colecciones
